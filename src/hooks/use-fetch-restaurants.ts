import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { type Restaurant } from '@/types/restaurant'
import { fetchRestaurants } from '@/api-service'
import { sanitiseParam, filterRestaurantsByNameOrCusine } from '@/service/filter-utils'

// In a real world scenario the search would be done on the server
// and parameters would be passed to the query to make an API call
// export const useFetchRestaurants = (name?: string): QueryObserverResult<Restaurant[], Error> => {
//   const hasName = name && `name_like=${sanitiseParam(name)}`
//   const requestParams = hasName ? `?${hasName}` : ''
//   return useQuery<Restaurant[], Error>({
//     queryKey: ['restaurants', requestParams],
//     queryFn: fetchRestaurants(requestParams),
//     refetchOnWindowFocus: false,
//     staleTime: 500,
//     retry: 0,
//   })
// }


/**
 * Custom React hook for fetching and managing restaurant data with search functionality.
 * 
 * This hook provides a typed interface to the TanStack Query (React Query) `useQuery` hook
 * specifically optimized for restaurant data fetching. It includes built-in search parameter
 * sanitization, client-side filtering, and performance optimizations.
 * 
 * Key features:
 * - Automatic query key generation based on sanitized search terms
 * - Client-side filtering by restaurant name or cuisine type
 * - Optimized caching with 500ms stale time
 * - Disabled window focus refetching for better UX
 * - No automatic retries on failure
 * 
 * @param {string} [searchTerm] - Optional search term to filter restaurants by name or cuisine.
 *                                If not provided or empty, fetches all restaurants.
 * 
 * @returns {QueryObserverResult<Restaurant[], Error>} React Query result object.
 */
export const useFetchRestaurants = (searchTerm?: string): QueryObserverResult<Restaurant[], Error> => {
  return useQuery<Restaurant[], Error>({
    queryKey: ['restaurants', sanitiseParam(searchTerm || '')],
    queryFn: fetchRestaurants(), 
    refetchOnWindowFocus: false,
    staleTime: 500,
    retry: 0,
    select: filterRestaurantsByNameOrCusine(searchTerm)
  })
}

