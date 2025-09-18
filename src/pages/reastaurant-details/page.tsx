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
import {
  Container,
  Header,
  RestaurantName,
  Cuisines,
  InfoRow,
} from './details-page.styles'

/**
 * Page for restaurant details.
 * The restaurant is getting retrieved from Context.
 * doing it this way only in the small app, in a large app 
 * would use something like 
 * React Query/SWR with API call like so:
 * const { data: restaurant } = useQuery(['restaurant', paramId], 
 *   () => fetchRestaurant(paramId)
 * )
 * @returns 
 */
export const RestaurantDetailsPage = (): ReactElement => {
  const { name : paramName } = useParams<{ name: string }>()
  const { restaurants, isLoading } = useRestaurantContext()

  const restaurant = restaurants?.find(r => createSlug(r.name) === paramName)

  if (!restaurant) {
    if (isLoading) {
      return (<LoadingLogo data-testid='list-loading-icon'/>)
    }
    return <div>Restaurant not found</div>
  }
  const { name, imageLink, cuisines, open, close, address1, suburb, deals } = restaurant

  const onRedeemDeal = (dealId: string) => {
    console.log(`Redeeming deal with ID: ${dealId}`)
  }

  const formatDealTime = (deal: Deal) => {
    if (deal.open && deal.close) {
      return `${deal.open} - ${deal.close}`
    }
    if (deal.start && deal.end) {
      return `${deal.start} - ${deal.end}`
    }
    return `${open} - ${close}`
  }

  return (<>
    <Image 
        src={imageLink} 
        alt={name} 
        borderRadius="0"
    />
    <Container>
      <Header>
        <RestaurantName as='h1'>{name}</RestaurantName>
        <Cuisines>{cuisines.join(' • ')}</Cuisines>
        
        <InfoRow>
          <IconClock />
          <Text $variant="body">Hours: {open} - {close}</Text>
        </InfoRow>
        
        <InfoRow>
          <IconPin />
          <Text $variant="body">{address1}, {suburb}</Text>
        </InfoRow>
      </Header>

      <DealsList deals={deals} formatDealTime={formatDealTime} onRedeemDeal={onRedeemDeal} />
    </Container>
  </>
  )
}

