import React from 'react'
import styled from 'styled-components'
import IconHeart from '@/theme/icons/heart.svg?react'

interface FavouriteButtonProps {
  /** Whether the item is currently favorited */
  isFavourite: boolean
  /** Callback function when favorite state changes */
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void
  /** Optional aria label override */
  ariaLabel?: string
  /** Additional CSS class name */
  className?: string
}

const StyledFavouriteButton = styled.button<{ $isFavourite: boolean }>`
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

/**
 * Favorite button component with heart icon and accessibility support.
 * 
 * @param isFavourite - Current favorite state
 * @param onToggle - Function called when button is clicked
 * @param ariaLabel - Optional custom aria label
 * @param className - Additional CSS classes
 */
export const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  isFavourite,
  onToggle,
  ariaLabel,
  className
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      /* eslint-disable-next-line */
      onToggle(e as any)
    }
  }

  const defaultAriaLabel = `${isFavourite ? 'Remove from' : 'Add to'} favorites`

  return (
    <StyledFavouriteButton
      $isFavourite={isFavourite}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel || defaultAriaLabel}
      aria-pressed={isFavourite}
      type="button"
      className={className}
    >
      <IconHeart />
    </StyledFavouriteButton>
  )
}

export default FavouriteButton
