import { useState, useEffect, createContext, ReactNode, useMemo } from 'react'
import debounce from 'lodash.debounce'
import { useFetchRestaurants } from '@/hooks/use-fetch-restaurants'
import { type Restaurant } from '@/types/restaurant'
import { sortRestaurantsByBestDeals } from '@/service/sorting-utils'

/**
 * Shape of the context value provided to consuming components.
 * 
 * @interface RestaurantsContextType
 * @property {Restaurant[] | undefined} restaurants - Array of sorted restaurants or undefined if not loaded
 * @property {string} search - Current search query string
 * @property {boolean} [isError] - Whether the restaurants fetch operation failed
 * @property {boolean} [isLoading] - Whether the restaurants fetch operation is in progress
 * @property {boolean} [isSuccess] - Whether the restaurants fetch operation completed successfully
 * @property {function} onSearchChange - Debounced handler for search input changes
 */
export type RestaurantsContextType = {
  restaurants: Restaurant[] | undefined
  search: string
  isError?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * React Context for managing restaurant data and search functionality.
 * Provides restaurant list, search state, and loading states to child components.
 */
export const RestaurantsContext = createContext<RestaurantsContextType>({
  restaurants: undefined,
  search: '',
  onSearchChange: () => {}
})

/**
 * Props for the RestaurantsContextProvider component.
 * 
 * @interface ContextProviderProps
 * @property {ReactNode} [children] - Child components to wrap with the context provider
 */
type ContextProviderProps = {
  children?: ReactNode
}

/**
 * Context provider component that manages restaurant data and search functionality.
 * 
 * This provider:
 * - Manages search state with debounced input handling (500ms delay)
 * - Fetches restaurants based on search query using the useFetchRestaurants hook
 * - Sorts restaurants by best deals automatically
 * - Provides loading, success, and error states to consuming components
 * - Handles cleanup of debounced functions on unmount
 * 
 * @component
 * @param {ContextProviderProps} props - The component props
 * @param {ReactNode} [props.children] - Child components that will have access to the restaurant context
 * @returns {JSX.Element} Provider component wrapping children with restaurant context`
 * 
 */
export function RestaurantsContextProvider({ children }: ContextProviderProps): JSX.Element {
  const [search, setSearch] = useState('')

  const { data: restaurants, isError, isSuccess, isPending: isLoading } = useFetchRestaurants(search)

  const sortedRestaurants = restaurants !== undefined ? 
    sortRestaurantsByBestDeals(restaurants) : undefined

  /**
   * Handles search input changes by updating the search state.
   * This function is wrapped by the debounced version below.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setSearch(name)
  }
  
  /**
   * Debounced version of handleSearchChange that prevents excessive API calls.
   * Waits 500ms after the user stops typing before executing the search.
   * Memoized to maintain function reference stability across re-renders.
   */
  const debouncedSearchChange = useMemo(() => {
    return debounce((e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e), 500)
  }, [])

  /**
   * Cleanup effect that cancels pending debounced calls when the component unmounts
   * or when the debounced function changes. Prevents memory leaks and unnecessary
   * state updates on unmounted components.
   */
  useEffect(() => {
    return () => {
      debouncedSearchChange.cancel()
    }
  }, [debouncedSearchChange])

  /**
   * Context value object containing all restaurant-related state and handlers.
   * Provides access to sorted restaurants, search state, loading states,
   * and the debounced search change handler.
   */
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
