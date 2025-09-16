import { useContext } from 'react'
import { RestaurantsContext } from './restaurant-page-context'

export function useRestaurantContext() {
  const context = useContext(RestaurantsContext)
  if (context === undefined) {
    throw new Error('Context must be used within a Provider')
  }
  return context
}
