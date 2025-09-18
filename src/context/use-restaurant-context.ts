import { useContext } from 'react'
import { RestaurantsContext } from './restaurant-page-context'

/**
 * React Context hook for managing restaurant data and search functionality.
 * Provides restaurant list, search state, and loading states to child components.
 */
export function useRestaurantContext() {
  const context = useContext(RestaurantsContext)
  if (context === undefined) {
    throw new Error('Context must be used within a Provider')
  }
  return context
}
