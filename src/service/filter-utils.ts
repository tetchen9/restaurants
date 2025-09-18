import { type Restaurant } from '@/types/restaurant'

/**
 * Sanitises the input string to be used as a url parameter.
 * Replaces spaces with "+", and removes special characters.
 * @param str input string
 * @returns sanitised string
 */
export const sanitiseParam = (str: string): string => {
  return str.trim().replace(/\s+/g, '+').replace(/[/&?=:%]/g, '')
}

/**
 * creates a URL-friendly slug
 * @param name 
 * @returns URL-friendly slug
 */
export const createSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
  
/**
 * Creates a filter function that searches restaurants by name 
 * or cuisine types.
 * 
 * @param searchTerm - The search query string. Can contain:
 *   - Single term: "Indian" or "Masala"
 *   - Multiple comma-separated terms: "Indian, Thai, Korean"
 *   - Multi-word terms: "Masala Kitchen, Fried Chicken"
 *   - Case-insensitive matching
 *   - Partial matching (e.g., "Asia" matches "Asian")
 * 
 * @returns A filter function that takes an array of restaurants and returns filtered results.
 *   If searchTerm is undefined or empty, returns all restaurants unchanged.
 */
export const filterRestaurantsByNameOrCusine = (searchTerm: string | undefined)
  : ((data: Restaurant[]) => Restaurant[]) => {
  return (data) => {
    if (!searchTerm) return data

    // Split by comma and trim whitespace
    const searchTerms = searchTerm.split(',')
      .map(term => term.trim().toLowerCase())
      .filter(Boolean)
    
    return data.filter(restaurant => {
      const restaurantName = restaurant.name.toLowerCase()
      const restaurantCuisines = restaurant.cuisines.map(c => c.toLowerCase())
      // Check if any search term matches name or cuisines
      return searchTerms.some(term => 
        restaurantName.includes(term) ||
        restaurantCuisines.some(cuisine => cuisine.includes(term))
      )
    })
  }
}

