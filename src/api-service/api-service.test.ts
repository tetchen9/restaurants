import axios, { AxiosError } from 'axios'
import MockAdapter  from 'axios-mock-adapter'
import { mockRestaurants } from '@/test/mock-restaurants'
import appConfig from '@/config'
import { fetchRestaurants } from '.'

const mockAxios = new MockAdapter(axios)
mockAxios.onGet(`${appConfig.baseAPIUrl}/restaurants`)
  .reply(200, mockRestaurants)


afterAll(() => { 
  mockAxios.restore()
})

describe('fetchRestaurants', () => {
  it('should fetch restaurants', async () => {
    const response = fetchRestaurants()
    const data = await response()
    expect(data).toEqual(mockRestaurants)
  })

  it('should return an error for a bad request', async () => {
    mockAxios.onGet(`${appConfig.baseAPIUrl}/restaurants`).reply(400)
    try {
      const response = fetchRestaurants()
      await response()
    } catch (error) {
      if (error) {
        expect((error as AxiosError).response?.status).toBe(400)
      }
    }
  })

})
