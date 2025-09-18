import styled from 'styled-components'
import { Text } from '@/ui-kit/text'

export const Container = styled.div`
  padding: 1.5rem;
`

export  const Header = styled.div`
  margin-bottom: 1rem;
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
  margin-bottom: 0.75rem;
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
