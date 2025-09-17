import { render, screen } from '@/test/utils'
import RestaurantsList from '.'
import { RestaurantsContext, RestaurantsContextType } from '@/context/restaurant-page-context'
import { ReactNode } from 'react'
import { mockRestaurants } from '@/test/mock-restaurants'
import { MemoryRouter } from 'react-router-dom';

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn(),
})

const renderWithRestaurantsContextProvider = ( ui: ReactNode, props: Partial<RestaurantsContextType>) => {
  const { restaurants, isError, isLoading, isSuccess } = props
  const providerProps: RestaurantsContextType = {
    restaurants: restaurants || undefined,
    search: '',
    isError: isError || false,
    isLoading: isLoading || !restaurants,
    isSuccess: isSuccess || restaurants !== null,
    onSearchChange: vi.fn()
  }

  return render(
    <MemoryRouter>
      <RestaurantsContext.Provider value={providerProps}>{ui}</RestaurantsContext.Provider>
    </MemoryRouter>
  )
}

describe('RestaurantsList', () => {
  it('should render without crashing', () => {
    render(<RestaurantsList />)
    const listElement = screen.getByRole('list')
    expect(listElement).toBeInTheDocument()
  })

  it('should display a loader icon when data is Loading', () => {
    renderWithRestaurantsContextProvider(<RestaurantsList />, { isLoading: true })
    const loadingIcon = screen.getByTestId('list-loading-icon')
    expect(loadingIcon).toBeInTheDocument()
  })

  it('should not display a loader icon when restaurants array is empty', () => {
    renderWithRestaurantsContextProvider(<RestaurantsList />, { restaurants:[], isSuccess: true })
    expect(screen.getByText('No restaurants found')).toBeInTheDocument()
    expect(screen.queryByTestId('list-loading-icon')).not.toBeInTheDocument()
  })

  it('should display the correct number of items in the list', () => {
    renderWithRestaurantsContextProvider(<RestaurantsList />, { restaurants: mockRestaurants })
    const items = screen.getAllByRole('listitem')
    expect(items.length).toBe(3)
  })

})

