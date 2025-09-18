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

export const StyledCard = styled.div`
  width: 100%;

  @media ${({theme}) => theme.device.tablet} {
    display: grid;
    grid-template-columns: 60% 40%;
  }
`

export const DetailsWrapper = styled.div`
  padding-left: 1rem;
`

export const RestaurantNameWrapper = styled.div<{ $isFavourite: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
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

export const FavoriteButton = styled.button<{ $isFavourite: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  outline: none;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.color.lightGray};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.color.gray};
  }

  svg {
    transition: color 0.2s;
    fill: ${({ $isFavourite, theme }) => 
      $isFavourite ? theme.color.jasperRed : 'transparent'};
    stroke: ${({ $isFavourite, theme }) => 
      $isFavourite ? theme.color.jasperRed : 'currentColor'};
  }
`

export const CuisinesList = styled.p`
  ${({ theme }) => theme.typography?.body || 'font-size: 0.875rem;'};
  color: ${({ theme }) => theme.color?.gray};
  margin: 0;
`
