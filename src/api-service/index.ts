import axios from 'axios'
import { type Restaurant } from '@/types/restaurant'
import appConfig from '../config'

export const fetchRestaurants = (requestParams: string | undefined = '') => {
  const path = '/restaurants'
  const url = `${appConfig.baseAPIUrl}${path}${requestParams}`
  return async () => {
    const response = await axios.get<Restaurant[]>(url)
    return response.data
  }
}
