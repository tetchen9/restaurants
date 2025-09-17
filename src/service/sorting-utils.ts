import { type Restaurant, Deal } from '@/types/restaurant'

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
