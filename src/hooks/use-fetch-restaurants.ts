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

