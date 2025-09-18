import IconPin from '@/theme/icons/pin.svg?react'
import IconHeart from '@/theme/icons/heart.svg?react'
import IconCall from '@/theme/icons/call.svg?react'
import IconMenu from '@/theme/icons/menu.svg?react'
import { Text } from '@/ui-kit/text'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
  margin-bottom: 1rem;
  padding: 0 1rem 0.5rem;
`

const NavItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  color: ${({ theme }) => theme.color.gray};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.color.darkBlue};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.input.focus.outline};
    outline-offset: 0.25rem;
  }
`

export const Label = styled(Text).attrs({
  $variant: 'bodySmallBold'
})`
  color: ${({ theme }) => theme.color.gray};
`

// Navigation Item Component
const NavItem = ({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick?: () => void; 
}) => (
  <NavItemContainer 
    tabIndex={0}
    role="button"
    aria-label={label}
    onClick={onClick}
  >
    {icon}
    <Label>{label}</Label>
  </NavItemContainer>
)

// Main Navigation Component
export const DetailsHeader = () => {
  const handleMenuClick = () => console.log('Menu clicked')
  const handleCallClick = () => console.log('Call Us clicked')
  const handleLocationClick = () => console.log('Location clicked')
  const handleFavouriteClick = () => console.log('Favourite clicked')

  return (
    <HeaderContainer>
      <NavItem 
        icon={<IconMenu />} 
        label="Menu" 
        onClick={handleMenuClick}
      />
      <NavItem 
        icon={<IconCall />} 
        label="Call Us" 
        onClick={handleCallClick}
      />
      <NavItem 
        icon={<IconPin />} 
        label="Location" 
        onClick={handleLocationClick}
      />
      <NavItem 
        icon={<IconHeart />} 
        label="Favourite" 
        onClick={handleFavouriteClick}
      />
    </HeaderContainer>
  )
}
