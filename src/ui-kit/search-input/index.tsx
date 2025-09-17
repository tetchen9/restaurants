import { ComponentPropsWithoutRef, ReactElement } from 'react'
import styled from 'styled-components'
import iconSearchUrl from '@/theme/icons/search.svg'

const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 6px 12px 6px 34px;
  border: 1px solid ${({ theme }) => theme.color.input.border};  
  border-left-width: 0;
  border-right-width: 0;
  background-color: ${({ theme }) => theme.color.input.background};
  background-image: url("${iconSearchUrl}");
  background-repeat: no-repeat;
  background-position: 10px 50%;
  background-size: 1rem;
  color: ${({ theme }) => theme.color.input.text};
  ${({ theme }) => theme.typography.bodySmall};
  
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance:none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.input.placeholder};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.input.hover.background};
  }

  &:focus {
    background-color: ${({ theme }) => theme.color.input.focus.background};
    outline: 2px solid ${({ theme }) => theme.color.input.focus.outline};
    outline-offset: 2px;
  }
  
  &:valid {
    background-color: ${({ theme }) => theme.color.input.filled.background};
  }
`

type InputProps = ComponentPropsWithoutRef<'input'>

/**
 * A search input component that renders a styled input element with type 'search'.
 * Has a search icon on the left side of the input field.
 *
 * @param {InputProps} props - The properties passed to the input element.
 * @returns {ReactElement} The rendered search input component.
 */
export const SearchInput = (props: InputProps): ReactElement => {
  return (
    <StyledInput type='search' autoComplete='off' required title='' spellCheck='false' {...props}/>
  )
}
