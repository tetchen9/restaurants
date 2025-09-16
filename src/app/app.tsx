import { ReactElement, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { RestaurantsPage } from '@/pages/restaurants/page'
import { RestaurantsContextProvider } from '@/context/restaurant-page-context'
import { useListQueryClient } from '@/hooks/query-client'
import { ThemeProvider } from '@/theme/provider'
import { AppHeader } from './header'

/**
 * The main application component that sets up the context providers, routing, and theming for the app.
 *
 * @returns {ReactElement} The rendered application component.
 *
 * @remarks
 * This component uses several context providers to manage state and theming:
 * - `ThemeProvider` for theming.
 * - `QueryClientProvider` for managing state with React Query.
 * - `RestaurantsContextProvider` for keeping the restaurants-related properties.
 *
 * The component also sets up routing using `BrowserRouter` and defines several routes.
 */
export const App = (): ReactElement => {
  const [queryClient] = useState(useListQueryClient())

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppHeader />
          <RestaurantsContextProvider>
            <Routes>
              <Route index element={<RestaurantsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </RestaurantsContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
