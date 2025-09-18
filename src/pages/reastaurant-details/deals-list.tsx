import { ReactElement } from 'react'
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
  onRedeemDeal: (dealId: string) => void
}

export const DealsList = ({ deals, formatDealTime, onRedeemDeal }: DealsListProps): ReactElement => {
  const dealsSorted = [...deals].sort((a, b) => 
    parseInt(b.discount) - parseInt(a.discount))

  return <DealsSection>
    {dealsSorted.map((deal) => (
      <DealCard key={deal.objectId}>
        <DealContent>
          <DealHeader>
            <DiscountText>{deal.discount}% off</DiscountText>
          </DealHeader>

          <Text $variant="bodySmall">{`Betweeen ${formatDealTime(deal)}`}</Text>

          <DealMeta>
            <Text $variant="bodySmall">
              {deal.dineIn === 'true' ? 'Dine-in only' : 'Takeaway only'} • {deal.qtyLeft} Deals left
            </Text>
          </DealMeta>
        </DealContent>

        <RedeemButton onClick={() => onRedeemDeal(deal.objectId)}>
          Redeem
        </RedeemButton>
      </DealCard>
    ))}
  </DealsSection>
}
