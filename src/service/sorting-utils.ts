import { type Restaurant, Deal } from '@/types/restaurant'

/**
 * Sorts an array of restaurants by their best available deals, prioritizing lightning deals
 * and highest discount percentages.
 * 
 * The sorting algorithm follows this priority order:
 * 1. Lightning deals are prioritized over regular deals
 * 2. Among deals of the same type (lightning vs regular), higher discounts come first
 * 3. Restaurants without deals are sorted to the end
 * 
 * @param {Restaurant[]} restaurants - Array of restaurants to sort
 * @returns {Restaurant[]} A new sorted array of restaurants ordered by best deals first
 */
export function sortRestaurantsByBestDeals(restaurants: Restaurant[]): Restaurant[] {
  return restaurants.sort((a, b) => {
    // get best deal for each restaurant
    const bestDealA = getBestDeal(a.deals)
    const bestDealB = getBestDeal(b.deals)
    if (bestDealA?.lightning !== bestDealB?.lightning) {
      return bestDealB?.lightning === 'true' ? 1 : -1
    }
    const discountA = parseInt(bestDealA?.discount || '0')
    const discountB = parseInt(bestDealB?.discount || '0')

    return discountB - discountA

  })
}

/**
 * Finds the best deal from an array of deals based on lightning status and discount percentage.
 * 
 * The selection criteria prioritizes:
 * 1. Lightning deals over regular deals
 * 2. Higher discount percentages within the same deal type
 * 
 * @param {Deal[]} deals - Array of deal objects to evaluate
 * @returns {Deal | null} The best deal object, or null if the deals array is empty
 */
export function getBestDeal(deals: Deal[]): Deal | null {
  return deals.length === 0 ? null : deals.reduce((best, current) => {
    const currentDiscount = parseInt(current.discount)
    const bestDiscount = parseInt(best.discount)
    
    if (current.lightning === 'true' && best.lightning !== 'true') {
      return current
    }
    if (best.lightning === 'true' && current.lightning !== 'true') {
      return best
    }
    
    return currentDiscount > bestDiscount ? current : best
  })
}
