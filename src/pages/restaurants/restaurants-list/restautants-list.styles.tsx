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
