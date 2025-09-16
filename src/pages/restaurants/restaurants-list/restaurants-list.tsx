import { render, screen } from '@/test/utils'
import { within } from '@testing-library/react'
import RestaurantsList from '.'
import { RestaurantsContext, RestaurantsContextType } from '@/context/restaurant-page-context'
import { ReactNode } from 'react'
import { mockRestaurants } from '@/test/mock-restaurants'

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
    <RestaurantsContext.Provider value={providerProps}>{ui}</RestaurantsContext.Provider>
  )
}

describe('RestaurantsList', () => {
  it('should render without crashing, have a header', () => {
    render(<RestaurantsList />)
    const listElement = screen.getByRole('list')
    const rows = screen.getAllByRole('row')
    expect(listElement).toBeInTheDocument()
    expect(rows.length).toBe(1) // header row
    const headerNames = ['Name', 'Famous Book', 'Type', 'City', 'Total Sales']
    headerNames.forEach(expectTextToBeInRow(rows[0]))
  })

  it('should display a loader icon when data is Loading', () => {
    renderWithRestaurantsContextProvider(<RestaurantsList />, { isLoading: true })
    const loadingIcon = screen.getByTestId('list-loading-icon')
    expect(loadingIcon).toBeInTheDocument()
  })

  it('should not display a loader icon when restaurants array is empty', () => {
    renderWithRestaurantsContextProvider(<RestaurantsList />, { restaurants:[], isSuccess: true })
    expect(screen.getByText('No members found')).toBeInTheDocument()
    expect(screen.queryByTestId('list-loading-icon')).not.toBeInTheDocument()
  })

  it('should display the correct number of rows and columns', () => {
    renderWithRestaurantsContextProvider(<RestaurantsList />, { restaurants: mockRestaurants })
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(4)
    const columns = screen.getAllByRole('columnheader')
    expect(columns.length).toBe(5)
  })

  it('should display the correct data in the list', () => {
    renderWithRestaurantsContextProvider(<RestaurantsList />, { restaurants: mockRestaurants })
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(4)
    const cellTexts1 = ['Masala Kitchen', 'Forest Song', 'Kyiv', 'Poet', 'UAH 5.000.000,00 ₴']
    cellTexts1.forEach(expectTextToBeInRow(rows[1]))
    const cellTexts2 = ['ABC Chicken', 'Zakhar Berkut', 'Lviv', 'ProseWriter', 'UAH 15.000.000,00 ₴']
    cellTexts2.forEach(expectTextToBeInRow(rows[2]))
  })
})

function expectTextToBeInRow(row: HTMLElement): (value: string) => void {
  return (cellText: string) => {
    const cell = within(row).getByText(cellText)
    expect(cell).toBeInTheDocument()
  }
}
