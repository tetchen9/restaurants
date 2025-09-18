import styled from 'styled-components'
import { Deal } from '@/types/restaurant'
import { ReactElement } from 'react'
import { Text } from '@/ui-kit/text'

const Badge = styled.div`
  position: absolute;
  top: .5rem;
  left: .5rem;
  z-index: 10;

  padding: 0.25rem 1rem 0.2rem 0.4rem;
  border-radius: 0.5rem;
  width: fit-content;
  ${({ theme }) => theme.typography.bodySmallBold};
  color:${({ theme }) => theme.color.ghostWhite};
  background-color:${({ theme }) => theme.color.jasperRed};
  >* {
    line-height: 1rem;
    display: block;
  }
`

interface DealBannerProps {
  deal: Deal 
}

export const DealBadge = ({ deal }: DealBannerProps): ReactElement => {
  const { discount, dineIn, close} = deal
  const label = `${discount}% off${dineIn ? ' - Dine In' : ''}` 
  const time = close !== undefined ? `Arrive before ${close}` : 'Anytime today'

  return (
    <Badge>
      <Text $variant="bodyBold">{label}</Text>
      <Text $variant="bodyCaption">{time}</Text>
    </Badge>
  )
}
