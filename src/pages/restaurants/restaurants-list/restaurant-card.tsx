import React from 'react'
import { Image } from '@/ui-kit/image'
import { Card } from '@/ui-kit/card'
import { type Restaurant } from '@/types/restaurant'
import IconHeart from '@/theme/icons/heart.svg?react'
import { RestaurantNameWrapper } from './restautants-list.styles'

interface RestaurantCardProps {
    restaurant: Restaurant
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {

    const [isFavourite, setIsFavourite] = React.useState(false)

    const addToFavourites = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        //this is for illustration purposes only, in a real app we would persist this state
        setIsFavourite((isFavourite) => !isFavourite)
        console.log(`Added ${restaurant.name} to favourites!`)
    }

    return (
        <Card>
            <Image 
                src={restaurant.imageLink} 
                alt={restaurant.name} 
            />
            <RestaurantNameWrapper $isFavourite={isFavourite}>
                {restaurant.name}
                <IconHeart aria-label="Add to favorites" onClick={addToFavourites} />
            </RestaurantNameWrapper>
            <p>{restaurant.address1}, {restaurant.suburb}</p>
            <p>{restaurant.cuisines.join(', ')}</p>
            
        </Card>
    )
}

export default RestaurantCard
