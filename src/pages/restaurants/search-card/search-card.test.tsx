import { render, screen, userEvent } from '@/test/utils'
import { describe, it, expect } from 'vitest'
import { SearchCard } from '.'
import { RestaurantsContext, RestaurantsContextType } from '@/context/restaurant-page-context'
import { ReactNode } from 'react'
import { act } from '@testing-library/react' 


const renderWithRestaurantsContextProvider = (
  ui: ReactNode, 
  handleSearchChange: () => void,
) => {
  const providerProps: RestaurantsContextType = {
    restaurants: [],
    search: '',
    onSearchChange: handleSearchChange,
  }

  return render(
    <RestaurantsContext.Provider value={providerProps}>{ui}</RestaurantsContext.Provider>
  )
}

describe('SearchCard', () => {
  it('should display the search input with icon in the background', () => {
    render(<SearchCard />)
    const inputElement = screen.getByRole('searchbox', { name: /Search by name/i })
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('placeholder', 'e.g. chinese, pizza')
  })

  it('should call the onChange function when the search input is changed', async () => {
    const handleSearchChange = vi.fn()
    renderWithRestaurantsContextProvider(<SearchCard />, handleSearchChange)
    const inputElement = screen.getByRole('searchbox')
    const text = 'Anna'
    await act(() => userEvent.type(inputElement, text))
    expect(handleSearchChange).toHaveBeenCalled()
    expect(handleSearchChange).toHaveBeenCalledTimes(text.length)
  })

})
