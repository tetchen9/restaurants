
import { render, screen, userEvent } from '@/test/utils'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { waitFor } from '@testing-library/react'
import MockAdapter  from 'axios-mock-adapter'
import { RestaurantsContextProvider } from '@/context/restaurant-page-context'
import { mockRestaurants } from '@/test/mock-restaurants'
import { useListQueryClient } from '@/hooks/query-client'
import { RestaurantsPage } from './page'
import appConfig from '@/config'
import { act } from '@testing-library/react' 

const mockAxios = new MockAdapter(axios)
mockAxios.onGet(`${appConfig.baseAPIUrl}/restaurants`)
  .reply(200, mockRestaurants)
mockAxios.onGet(`${appConfig.baseAPIUrl}/restaurants?name_like=Masala+Kitchen`)
  .reply(200, [mockRestaurants[0]])

afterAll(() => {
  mockAxios.restore()
})

vi.mock('@/theme/icons/user.svg?react', () => ({
  default: () => <svg data-testid="user-icon" />,
}))

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn(),
})

describe('RestaurantsPage', () => {

  describe('RestaurantsPage without data', () => {

    it('should render the RestaurantsPage component, have a list and search fields', () => {
      render(
        <BrowserRouter>
          <RestaurantsPage />
        </BrowserRouter>
      )
      const list = screen.getByRole('list')
      expect(list).toBeInTheDocument()
      const searchCard = screen.getByRole('searchbox')
      expect(searchCard).toBeInTheDocument()
    })
  })

  describe('RestaurantsPage search behaviour', () => {

     
    const RenderWithRestaurantsContext = (ui: ReactNode ) => {
      const queryClient = useListQueryClient()

      return render(
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <RestaurantsContextProvider>
              {ui}
            </RestaurantsContextProvider>
          </QueryClientProvider>
        </BrowserRouter>
      )
    }

    it('should render the list with data', async() => {
      RenderWithRestaurantsContext(<RestaurantsPage />)
      await waitFor(() => [
        expect(screen.getAllByRole('listitem').length).toBe(3),
        expect(screen.getByText('Masala Kitchen')).toBeInTheDocument(),
        expect(screen.getByText('ABC Chicken')).toBeInTheDocument(),
      ], { timeout: 500 })
    })

    it('should search the list', async () => {
      RenderWithRestaurantsContext(<RestaurantsPage />)
      const searchBox = screen.getByRole('searchbox', { name: /Search by name/i })
      expect(searchBox).toBeInTheDocument()
      
      await act(async () => {
        await userEvent.type(searchBox, 'Masala Kitchen')
      })
      
      await waitFor(() => {
        expect(screen.getAllByRole('listitem').length).toBe(1)
        expect(screen.getByText('Masala Kitchen')).toBeInTheDocument()
        expect(screen.queryByText('ABC Chicken')).not.toBeInTheDocument()
      }, { timeout: 1500 })
    })

    it('should show a loader icon while data is loading', async() => {
      mockAxios.onGet(`${appConfig.baseAPIUrl}/restaurants`)
        .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, mockRestaurants]), 100)))

      RenderWithRestaurantsContext(<RestaurantsPage />)
      expect(screen.getByTestId('list-loading-icon')).toBeInTheDocument()
      
    })
  })

})
