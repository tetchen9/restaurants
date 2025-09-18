import React from 'react'
import { Image } from '@/ui-kit/image'
import { Card } from '@/ui-kit/card'
import { type Restaurant } from '@/types/restaurant'
import IconHeart from '@/theme/icons/heart.svg?react'
import { getBestDeal } from '@/service/sorting-utils'
import { DealBadge } from '@/pages/restaurants/restaurants-list/deal-badge'
import { 
    RestaurantNameWrapper, 
    RestaurantAddress, 
    ImageWrapper, 
    RestaurantName,
} from './restautants-list.styles'    


interface RestaurantCardProps {
    restaurant: Restaurant
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
    const { deals, name, imageLink, cuisines, suburb } = restaurant
    const [isFavourite, setIsFavourite] = React.useState(false)

    const addToFavourites = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()
        //this is for illustration purposes only, in a real app we would persist this state
        setIsFavourite((isFavourite) => !isFavourite)
        console.log(`Added ${restaurant.name} to favourites`)
    }

    const bestDeal = getBestDeal(deals) 

    return (
        <Card>
            <ImageWrapper>
                <Image 
                    src={imageLink} 
                    alt={name} 
                />
                {bestDeal && <DealBadge deal={bestDeal} />}
            </ImageWrapper>

            <RestaurantNameWrapper $isFavourite={isFavourite}>
                <RestaurantName>{name}</RestaurantName>
                <IconHeart aria-label="Add to favorites" onClick={addToFavourites} />
            </RestaurantNameWrapper>
            <RestaurantAddress>{suburb}</RestaurantAddress>
            <p>{cuisines.join(', ')}</p>
            
        </Card>
    )
}

export default RestaurantCard
