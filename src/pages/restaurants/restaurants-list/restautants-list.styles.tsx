import styled from 'styled-components'
import { Text } from '@/ui-kit/text'

export const NoRestaurantsText = styled(Text).attrs({
  $variant: 'bodySmall'
})`
  display: block;
  width: 100%;
  padding: 20px 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: center;
`

export const RestaurantNameWrapper = styled.div<{ $isFavourite: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  ${({ theme }) => theme.typography.h2};

  svg {
    fill: ${({ $isFavourite, theme }) => 
      ($isFavourite ? theme.color.lynch : 'none')} !important;
  }

  svg:hover {
    fill: ${({ theme }) => theme.color.darkBlue} !important;
  }
`

