import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { type Restaurant } from '@/types/restaurant'
import { fetchRestaurants } from '@/api-service'
import { sanitiseParam } from '../service/filter-utils'

export const useFetchRestaurants = (name?: string): QueryObserverResult<Restaurant[], Error> => {
  const hasName = name && `name_like=${sanitiseParam(name)}`
  const requestParams = hasName ? `?${hasName}` : ''
  return useQuery<Restaurant[], Error>({
    queryKey: ['restaurants', requestParams],
    queryFn: fetchRestaurants(requestParams),
    refetchOnWindowFocus: false,
    staleTime: 500,
    retry: 0,
  })
}

