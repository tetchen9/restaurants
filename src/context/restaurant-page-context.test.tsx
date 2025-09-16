import { render, screen, waitFor } from '@testing-library/react'
import { RestaurantsContextProvider } from './restaurant-page-context'
import { useFetchRestaurants } from '@/hooks/use-fetch-restaurants'
import { MockedFunction, vi } from 'vitest'
import { useRestaurantContext } from './use-restaurant-context'
import { mockRestaurants } from '@/test/mock-restaurants'

vi.mock('@/hooks/use-fetch-restaurants')

const mockUseFetchRestaurants = useFetchRestaurants as MockedFunction<typeof useFetchRestaurants>

const result = {
  data: mockRestaurants,
  isLoading: false,
  isError: false,
  refetch: vi.fn(),
}

describe('RestaurantsContextProvider', () => {

  afterEach(() => {
    vi.clearAllMocks()
  })

  const TestComponent = () => {
    const { restaurants, isError, isLoading } = useRestaurantContext()
    if (isError) return null
    if (isLoading) return <div>Loading...</div>
    return <div>{restaurants?.map(restaurant => restaurant.name).join(', ')}</div>
  }

  it('provides restaurant data to its children', async () => {

    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    mockUseFetchRestaurants.mockReturnValueOnce(result as any)
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    mockUseFetchRestaurants.mockReturnValueOnce(result as any) 
    render(
      <RestaurantsContextProvider>
        <TestComponent />
      </RestaurantsContextProvider>
    )

    await waitFor(() => {
      const names = screen.getByText('Masala Kitchen, ABC Chicken, Vrindavan')
      expect(names).toBeInTheDocument()
    })
  })

})
