
import { render, screen } from '@/test/utils'
import { mockRestaurants } from '@/test/mock-restaurants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFetchRestaurants } from './use-fetch-restaurants'

const queryClient = new QueryClient()

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    ...actual as any,
    useQuery: vi.fn(() => ({ isLoading: false, data: mockRestaurants }))
  }
})

export const TestComponent = () => {
  const { data } = useFetchRestaurants()

  if (!data) return null
  return (
    <ul data-testid='list'>
      {data.map(({name}) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  )
}

describe('useFetchRestaurants', () => {
  it('should fetch restaurants', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    )
    expect(screen.getByTestId('list')).toBeInTheDocument()
    expect(screen.getByText('Masala Kitchen')).toBeInTheDocument()
    expect(screen.getByText('ABC Chicken')).toBeInTheDocument()
  })
})
