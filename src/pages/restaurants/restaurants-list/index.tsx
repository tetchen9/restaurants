import { ReactElement } from 'react'
import { type Restaurant } from '@/types/restaurant'
import { RouterLink } from '@/ui-kit/router-link'
import { LoadingLogo } from '@/ui-kit/loading-logo'
import { createSlug } from '@/service/filter-utils'
import { List, ListItem, ListLoading } from '@/ui-kit/list'
import { useRestaurantContext } from '@/context/use-restaurant-context'
import { NoRestaurantsText } from './restautants-list.styles'
import RestaurantCard from './restaurant-card'
/**
 * RestaurantsList component renders a list displaying a collection of restaurants with their details.
 * It uses the `useRestaurantsContext` hook to fetch the data and handles loading and empty states.
 *
 * @returns {ReactElement} A list with items for each restaurant.
 */
const RestaurantsList = (): ReactElement => {
  const { restaurants, isLoading, isSuccess } = useRestaurantContext()

  const getLink = (name: string) => `/restaurants/${createSlug(name)}`

  return (<>
    <List>
      {!isLoading && restaurants !== undefined && restaurants?.map((restaurant: Restaurant) => (
        <ListItem key={restaurant.objectId}>
          <RouterLink to={getLink(restaurant.name)}>
            <RestaurantCard restaurant={restaurant} />
          </RouterLink>
        </ListItem>
      ))}
    </List>
    {isSuccess && !restaurants?.length && (
      <NoRestaurantsText>No restaurants found</NoRestaurantsText>
    )}
    {isLoading && (
      <ListLoading>
        <LoadingLogo data-testid='list-loading-icon'/>
      </ListLoading> 
    )}
  </>)
}

export default RestaurantsList
