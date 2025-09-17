import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { type Restaurant } from '@/types/restaurant'
import { useRestaurantContext } from '@/context/use-restaurant-context'

export const RestaurantDetailsPage = (): ReactElement => {
  const { name } = useParams<{ name: string }>()
  const { restaurants } = useRestaurantContext()

  const restaurant: Restaurant | undefined = restaurants?.find(r => r.name === name) 

  return (
    <div>
        {restaurant && (<>
            <p>Restaurant Name: {name}</p>
            <p>Hours: {restaurant.open || 'N/A'} - {restaurant.close || 'N/A'}</p>
        </>)}
    </div>
  )
}
