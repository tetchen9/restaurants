import React from 'react'
import { Image } from '@/ui-kit/image'
import { type Restaurant } from '@/types/restaurant'
import IconHeart from '@/theme/icons/heart.svg?react'
import { getBestDeal } from '@/service/sorting-utils'
import { DealBadge } from '@/pages/restaurants/restaurants-list/deal-badge'
import { 
    RestaurantNameWrapper, 
    RestaurantAddress, 
    ImageWrapper, 
    RestaurantName,
    StyledCard,
    DetailsWrapper,
    FavoriteButton,
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

    // Handle favorite toggle with proper event handling
    const handleFavoriteToggle = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        
        const newFavoriteState = !isFavourite
        setIsFavourite(newFavoriteState)
        
        // Call parent callback if provided
        if (onFavoriteToggle && objectId) {
            onFavoriteToggle(objectId, newFavoriteState)
        }
        
        console.log(`${newFavoriteState ? 'Added' : 'Removed'} ${name || 'restaurant'} ${newFavoriteState ? 'to' : 'from'} favourites`)
    }, [isFavourite, objectId, onFavoriteToggle, name])

    // Handle keyboard navigation for favorite button
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
               /* eslint-disable-next-line */
            handleFavoriteToggle(e as any)
        }
    }

    const displayCuisines = cuisines?.length > 0 ? cuisines.join(', ') : 'Cuisine not specified'

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
                    <RestaurantName>{name}</RestaurantName>
                    
                    <FavoriteButton
                        $isFavourite={isFavourite}
                        onClick={handleFavoriteToggle}
                        onKeyDown={handleKeyDown}
                        aria-label={`${isFavourite ? 'Remove from' : 'Add to'} favorites`}
                        aria-pressed={isFavourite}
                        type="button"
                    >
                        <IconHeart />
                    </FavoriteButton>
                </RestaurantNameWrapper>
                
                <RestaurantAddress>{suburb}</RestaurantAddress>
                
                <CuisinesList>
                    {!cuisines?.length ? '' : displayCuisines}
                </CuisinesList>
            </DetailsWrapper>
        </StyledCard>
    )
}

export default RestaurantCard
