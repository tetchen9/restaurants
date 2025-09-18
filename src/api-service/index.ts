import axios from 'axios'
import { type Restaurant } from '@/types/restaurant'
import appConfig from '../config'

/**
 * Creates an async function to fetch restaurants from the API.
 * 
 * This function returns a promise-based function that can be used with React Query
 * or called directly to retrieve restaurant data from the backend API.
 * 
 * @param requestParams - Optional query parameters to append to the API request.
 *   Should include the leading '?' if parameters are provided.
 *   Examples: '', '?name_like=Pizza', '?cuisines_like=Italian&limit=10'
 * 
 * @returns An async function that when called, returns a Promise 
 * resolving to an array of Restaurant objects
 * @throws {AxiosError} When the API request fails (network error, 404, 500, etc.)
 */
export const fetchRestaurants = (requestParams: string | undefined = '') => {
  const path = '/restaurants'
  const url = `${appConfig.baseAPIUrl}${path}${requestParams}`
  return async () => {
    const response = await axios.get<Restaurant[]>(url)
    return response.data
  }
}
