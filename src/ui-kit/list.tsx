import { ComponentPropsWithoutRef, ReactElement } from 'react'
import styled from 'styled-components'

export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  ${({ theme }) => theme.typography.bodySmall};
`

export const ListItem = styled.li`
  padding: 16px 0 16px 20px;
  ${({ theme }) => theme.typography.bodyBold};
  white-space: nowrap;
`

export const ListLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 166px;
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
