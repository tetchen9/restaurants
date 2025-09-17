import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color:${({ theme }) => theme.color.irisBlue};
  }

  &:focus {
    background-color: ${({ theme }) => theme.color.input.focus.background};
    outline-offset: 2px;
  }
`

type Props = {
  children: React.ReactNode
  to: string
};

export const RouterLink = ({ children, to }: Props): ReactElement => {
  return <StyledLink to={to}>{children}</StyledLink>
}
