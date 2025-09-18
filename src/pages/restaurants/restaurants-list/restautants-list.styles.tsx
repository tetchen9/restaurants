import styled from 'styled-components'
import { Text } from '@/ui-kit/text'

export const NoRestaurantsText = styled(Text).attrs({
  $variant: 'bodySmall'
})`
  display: block;
  width: 100%;
  padding: 2rem 0;
  text-align: center;
`

export const RestaurantNameWrapper = styled.div<{ $isFavourite: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;

  svg {
    fill: ${({ $isFavourite, theme }) => 
      ($isFavourite ? theme.color.lynch : 'none')} !important;
  }

  svg:hover {
    fill: ${({ theme }) => theme.color.darkBlue} !important;
  }
`
export const RestaurantAddress = styled(Text).attrs({
  $variant: 'bodySmall'
})`
  padding: 0.5rem 0 1rem 0;
  color: ${({ theme }) => theme.color.gray};
`

export const RestaurantName = styled(Text).attrs({
  $variant: 'h2'
})`
  font-family: 'Creo ExtraBold', sans-serif;
`

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
`
