import styled from 'styled-components'
import { Text } from '@/ui-kit/text'

export const Container = styled.div`
  padding: 0.5rem 1.5rem 2rem;

  @media ${({theme}) => theme.device.tablet} {
    max-width: 600px;
    margin: 0 auto;
  }
`

export const RestaurantName = styled(Text).attrs({
  $variant: 'h1'
})`
  font-family: 'Creo ExtraBold', sans-serif;
  margin-bottom: 0.25rem;
  text-align: center;
`

export const Cuisines = styled.p`
  ${({ theme }) => theme.typography.body};
  color: ${({ theme }) => theme.color.gray};
  text-align: center;
`

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.gray};
  margin-bottom: 0.5rem;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
`

export const NoRestaurantsText = styled(Text).attrs({
  $variant: 'bodySmall'
})`
  display: block;
  width: 100%;
  padding: 2rem 0;
  text-align: center;
`

export const RestaurantHeader = styled.header`
  margin-bottom: .5rem;
`

export const PageWrapper = styled.main`
  min-height: 100vh;
`

export const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: .5rem;
  border-top: 1px solid ${({ theme }) => theme.color.lightGray};
`
