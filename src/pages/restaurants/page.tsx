import { ReactElement } from 'react'
import RestaurantsList from './restaurants-list'
import { Container } from './page.styles'
import { SearchCard } from './search-card'

export const RestaurantsPage = (): ReactElement => {
  return (
    <Container>
      <SearchCard />
      <RestaurantsList />
    </Container>
  )
}
