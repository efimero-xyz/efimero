import {
  RouterProvider, createHashRouter
} from 'react-router-dom'
import { ThemeProvider } from './context/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { routes } from './routes'

export default function App (): JSX.Element {
  const router = createHashRouter(routes)
  return (
      <ThemeProvider defaultTheme="dark" storageKey="point-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
  )
}
