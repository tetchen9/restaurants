import { ReactElement, useMemo } from 'react'
import { type Deal } from '@/types/restaurant'
import { Text } from '@/ui-kit/text'
import {
  DealsSection,
  DealCard,
  DealContent,
  DealHeader,
  RedeemButton,
  DealMeta,
  DiscountText
} from './deals-list.styles'


interface DealsListProps {
  deals: Deal[]
  formatDealTime: (deal: Deal) => string
}

/**
 * Displays a sorted list of deals with discount information and redeem functionality.
 * 
 * @param deals - Array of deal objects to display
 * @param formatDealTime - Function to format deal time periods for display
 * @returns Rendered list of deal cards sorted by discount percentage (highest first)
 */
export const DealsList = ({ deals, formatDealTime }: DealsListProps): ReactElement => {
  const dealsSorted = useMemo(() => 
    [...deals].sort((a, b) => (parseInt(b.discount, 10) || 0) - (parseInt(a.discount)) || 0),
    [deals]
  )

  const formatDiscountText = (discount: string) => 
    `${discount}% off`
  const formatDineType = (dineIn: string, qtyLeft: string) => 
    `${dineIn === 'true' ? 'Dine-in only' : 'Takeaway only'} • ${qtyLeft} Deals left`

  return <DealsSection>
    {dealsSorted.map((deal) => (
      <DealCard key={deal.objectId}>
        <DealContent>
          <DealHeader>
            <DiscountText>{formatDiscountText(deal.discount)}</DiscountText>
          </DealHeader>

          <Text $variant="bodySmall">{`Between ${formatDealTime(deal)}`}</Text>
          <DealMeta>
            <Text $variant="bodySmall">
              {formatDineType(deal.dineIn, deal.qtyLeft)}
            </Text>
          </DealMeta>
        </DealContent>

        <RedeemButton aria-label='Redeem'>Redeem</RedeemButton>
      </DealCard>
    ))}
  </DealsSection>
}
