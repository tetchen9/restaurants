import { useState, useEffect, createContext, ReactNode, useMemo } from 'react'
import debounce from 'lodash.debounce'
import { useFetchRestaurants } from '@/hooks/use-fetch-restaurants'
import { type Restaurant } from '@/types/restaurant'
import { sortRestaurantsByBestDeals } from '@/service/sorting-utils'

export type RestaurantsContextType = {
  restaurants: Restaurant[] | undefined
  search: string
  isError?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RestaurantsContext = createContext<RestaurantsContextType>({
  restaurants: undefined,
  search: '',
  onSearchChange: () => {}
})

type ContextProviderProps = {
  children?: ReactNode
}

export function RestaurantsContextProvider({ children }: ContextProviderProps): JSX.Element {
  const [search, setSearch] = useState('')

  const { data: restaurants, isError, isSuccess, isPending: isLoading } = useFetchRestaurants(search)

  const sortedRestaurants = restaurants !== undefined ? 
    sortRestaurantsByBestDeals(restaurants) : undefined

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setSearch(name)
  }
  
  // Debounce the search change handler to prevent excessive API calls
  const debouncedSearchChange = useMemo(() => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e), 500)
  }, [])

  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel()
    }
  }, [debouncedSearchChange])

  const contextValue = {
    restaurants: sortedRestaurants,
    search,
    isError,
    isLoading,
    isSuccess,
    onSearchChange: debouncedSearchChange
  }

  return (
    <RestaurantsContext.Provider value={contextValue}>
      {children}
    </RestaurantsContext.Provider>
  )
}
