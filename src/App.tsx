import {
  RouterProvider, createHashRouter
} from 'react-router-dom'
import { ThemeProvider } from './context/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { routes } from './routes'
import { SessionProvider } from './ee2e/session'

export default function App (): JSX.Element {
  const router = createHashRouter(routes)
  return (
      <ThemeProvider defaultTheme="dark" storageKey="point-ui-theme">
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
        <Toaster />
      </ThemeProvider>
  )
}
