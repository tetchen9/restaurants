import { QueryCache, QueryClient } from '@tanstack/react-query'

export const useListQueryClient = (): QueryClient => {

  const client = new QueryClient({
    queryCache: new QueryCache({
      onError: () => {
        console.log('An error occurred while fetching data.')
      },
    }),
  })

  return client
}
