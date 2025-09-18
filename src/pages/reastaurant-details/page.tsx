import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { type Deal } from '@/types/restaurant'
import { useRestaurantContext } from '@/context/use-restaurant-context'
import IconClock from '@/theme/icons/clock.svg?react'
import IconPin from '@/theme/icons/pin.svg?react'
import { Text } from '@/ui-kit/text'
import { DealsList } from './deals-list'
import { Image } from '@/ui-kit/image'
import { createSlug } from '@/service/filter-utils'
import { LoadingLogo } from '@/ui-kit/loading-logo'
import { DetailsHeader } from './details-header'
import {
  Container,
  RestaurantName,
  Cuisines,
  InfoRow,
  NoRestaurantsText,
  PageWrapper,
  RestaurantHeader,
  InfoSection,
} from './details-page.styles'

/**
 * Page component displaying detailed restaurant information including deals.
 * 
 * Retrieves restaurant data from context using URL slug parameter.
 * In production apps, consider using React Query/SWR with direct API calls:
 * `const { data: restaurant } = useQuery(['restaurant', paramId], () => fetchRestaurant(paramId))`
 * 
 * @returns Restaurant details page with image, info, and deals list
 */
export const RestaurantDetailsPage = (): ReactElement => {
  const { name: paramName } = useParams<{ name: string }>()
  const { restaurants, isLoading, isError } = useRestaurantContext()

  if (isLoading) {
    return <LoadingLogo data-testid='list-loading-icon' />
  }

  if (isError) {
    return (
      <Container>
        <NoRestaurantsText>Failed to load restaurant details. </NoRestaurantsText>
      </Container>
    )
  }

  // Find restaurant by slug
  const restaurant = restaurants?.find(r => createSlug(r.name) === paramName)

  // Show not found state
  if (!restaurant) {
    return (
      <Container>
        <NoRestaurantsText>Restaurant not found</NoRestaurantsText>
      </Container>
    )
  }

  const { name, imageLink, cuisines, open, close, address1, suburb, deals } = restaurant

  // Format deal time with fallbacks
  const formatDealTime = (deal: Deal): string => {
    if (deal.open && deal.close) {
      return `${deal.open} - ${deal.close}`
    }
    if (deal.start && deal.end) {
      return `${deal.start} - ${deal.end}`
    }
    if (open && close) {
      return `${open} - ${close}`
    }
    return 'Hours not available'
  }

  // Prepare display data with fallbacks
  const displayCuisines = cuisines?.length > 0 && cuisines.join(' • ') 
  const displayHours = (open && close) && `${open} - ${close}`
  const displayAddress = [address1, suburb].filter(Boolean).join(', ')

  return (
    <PageWrapper>
      <Image 
        src={imageLink} 
        alt={`${name} restaurant`}
        borderRadius="0"
      />
      
      <Container>
        <DetailsHeader />
        
        <RestaurantHeader>
          <RestaurantName as='h1'>{name}</RestaurantName>
          <Cuisines role="text" aria-label="Restaurant cuisines">
            {displayCuisines}
          </Cuisines>
        </RestaurantHeader>
        
        <InfoSection aria-label="Restaurant information">
          <InfoRow>
            <IconClock aria-hidden="true" />
            <Text $variant="body">Hours: {displayHours}</Text>
          </InfoRow>
          
          <InfoRow>
            <IconPin aria-hidden="true" />
            <Text $variant="body">{displayAddress}</Text>
          </InfoRow>
        </InfoSection>

        {deals?.length > 0 ? (
          <DealsList 
            deals={deals} 
            formatDealTime={formatDealTime}
          />
        ) : (
          <NoRestaurantsText>No deals available at this time</NoRestaurantsText>
        )}
      </Container>
    </PageWrapper>
  )
}
