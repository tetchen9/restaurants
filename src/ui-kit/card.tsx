import styled from 'styled-components'
import { DefaultTheme } from 'styled-components'

const cardRadius = ({ theme }: { theme: DefaultTheme }) => theme.space.xs

export const Card = styled.div`
  border-radius: ${cardRadius};
  background-color: transparent;
  width: 100%;
  max-width: 100%;
`