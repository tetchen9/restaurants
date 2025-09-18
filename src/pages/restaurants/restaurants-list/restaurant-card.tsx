import React from 'react'
import { Image } from '@/ui-kit/image'
import { type Restaurant } from '@/types/restaurant'
import FavouriteButton from '@/ui-kit/favourite-button'
import { getBestDeal } from '@/service/sorting-utils'
import { DealBadge } from '@/pages/restaurants/restaurants-list/deal-badge'
import { 
    RestaurantNameWrapper, 
    RestaurantAddress, 
    ImageWrapper, 
    RestaurantName,
    StyledCard,
    DetailsWrapper,
    CuisinesList,
} from './restautants-list.styles'

interface RestaurantCardProps {
    restaurant: Restaurant;
    onFavoriteToggle?: (restaurantId: string, isFavorite: boolean) => void;
}

/**
 * Restaurant card component displaying restaurant information with favorite functionality.
 * 
 * @param restaurant - Restaurant data object
 * @param onFavoriteToggle - Optional callback when favorite state changes
 */
const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
    restaurant, 
    onFavoriteToggle 
}) => {
    const { deals, name, imageLink, cuisines, suburb, objectId } = restaurant
    const [isFavourite, setIsFavourite] = React.useState(false)

    // Memoize best deal calculation for performance
    const bestDeal = React.useMemo(() => {
        return deals?.length > 0 ? getBestDeal(deals) : null
    }, [deals])

    const handleFavoriteToggle = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        
        const newFavoriteState = !isFavourite
        setIsFavourite(newFavoriteState)
        
        if (onFavoriteToggle && objectId) {
            onFavoriteToggle(objectId, newFavoriteState)
        }
        
        console.log(`${newFavoriteState ? 'Added' : 'Removed'} ${name || 'restaurant'} ${newFavoriteState ? 'to' : 'from'} favourites`)
    }, [isFavourite, objectId, onFavoriteToggle, name])

    const displayCuisines = cuisines?.length > 0 && cuisines.join(', ') 

    return (
        <StyledCard>
            <ImageWrapper>
                <Image 
                    src={imageLink} 
                    alt={`${name} restaurant`}
                />
                {bestDeal && <DealBadge deal={bestDeal} />}
            </ImageWrapper>
            
            <DetailsWrapper>
                <RestaurantNameWrapper $isFavourite={isFavourite}>
                    <RestaurantName as='h2'>{name}</RestaurantName>
                    <FavouriteButton
                        isFavourite={isFavourite}
                        onToggle={handleFavoriteToggle}
                    />
                </RestaurantNameWrapper>
                <RestaurantAddress>{suburb}</RestaurantAddress>
                
                {!!cuisines?.length && (
                  <CuisinesList>{displayCuisines}</CuisinesList>
                )}
            </DetailsWrapper>
        </StyledCard>
    )
}

export default RestaurantCard
