import { ReactElement, useState } from 'react'
import { SearchInput } from '@/ui-kit/search-input'
import { useRestaurantContext } from '@/context/use-restaurant-context'
import { StyledSearchCard } from './search-card.styles'

export const SearchCard = (): ReactElement => {
  const { search, onSearchChange } = useRestaurantContext()
  const [localSearchValue, setLocalSearchValue] = useState(search)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchValue(e.target.value)
    onSearchChange(e)
  }

  return (
    <StyledSearchCard>
      <SearchInput 
        placeholder='e.g. chinese, pizza' 
        onChange={handleSearchChange} 
        aria-label='Search by name'
        value={localSearchValue}
      />
    </StyledSearchCard>
  )
}
