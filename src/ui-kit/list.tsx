import { ComponentPropsWithoutRef, ReactElement } from 'react'
import styled from 'styled-components'

export const StyledList = styled.ul`
  list-style: none;
  padding: 0 1rem;

  @media ${({theme}) => theme.device.tablet} {
    padding: 0;
  }
`

export const ListItem = styled.li`
  padding: 1rem 0;
  ${({ theme }) => theme.typography.body};
`

export const ListLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
`

type Props = ComponentPropsWithoutRef<'ul'>

/**
 * A functional component that renders a list within a styled container.
 *
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the list.
 * @returns {ReactElement} The rendered list component.
 */
export const List = (props: Props): ReactElement => {
  const { children, ...rest } = props

  return (
    <StyledList {...rest}>
      {children}
    </StyledList>
  )

}
