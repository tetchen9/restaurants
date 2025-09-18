import { ReactElement } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { SROnly } from '../sr-only'

export type ButtonVariants = 'primary' | 'secondary' | 'default'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The function to call when the button is clicked. */
  onClick?: () => void
  /** The variant of the button. */
  $variant?: ButtonVariants
  /** The content to display within the button. */
  children: ReactElement | string
  /** Aria label for the button. */
  ariaLabel?: string
  /** Loading state of the button */
  $isLoading?: boolean
}

export const StyledButton = styled.button<ButtonProps>`
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  ${({ theme }) => theme.typography.bodyBold};
  cursor: pointer;
  transition: background-color 0.2s;

  ${({ $variant }) =>
    $variant === 'secondary' && css`
      color: ${({ theme }) => theme.color.jasperRed};
      border: 2px solid ${({ theme }) => theme.color.jasperRed};
      &:hover {
        background-color: ${({ theme }) => theme.color.jasperRedLight};
        color: ${({ theme }) => theme.color.ghostWhite};
      }
  `}

  ${({ $variant }) =>
    $variant === 'primary' && css`
      color: ${({ theme }) => theme.color.darkBlue};
      border: 2px solid ${({ theme }) => theme.color.gray};
      &:hover {
        background-color: ${({ theme }) => theme.color.gray};
        color: ${({ theme }) => theme.color.ghostWhite};
      }
  `}

`
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledSpinner = styled.span`
  position: absolute;
  display: block;
  width: 1em;
  height: 1em;
  top: calc(50% - 0.5em);
  left: calc(50% - 0.5em);
  border-width: 2px;
  border-color: inherit;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-style: solid;
  border-radius: 50%;
  animation: ${spin} 0.45s linear infinite;
`


export const Button = (props: ButtonProps): ReactElement => {
  const { $variant = 'primary', $isLoading, children, ...rest } = props

  const wrappedChildren = (<>
    {$isLoading && (
      <>
        <SROnly aria-live="assertive">Loading</SROnly>
        <StyledSpinner />
      </>
    )}
    {!$isLoading && children}
  </>)


  return (
    <StyledButton type='button' $variant={$variant} {...rest}>
      {wrappedChildren}
    </StyledButton>
  )
}
