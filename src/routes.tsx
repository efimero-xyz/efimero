import { type RouteObject, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { MarketingLayout } from './features/landing/layout'
import { LandingHomePage } from './features/landing/home'
import { SecureMainContainer } from './features/app/main'

export function ErrorPage (): JSX.Element {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops ....!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{isRouteErrorResponse(error) && (error.statusText)}</i>
      </p>
    </div>
  )
}

export const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <MarketingLayout />,
    children: [
      {
        index: true,
        element: <LandingHomePage />
      }
    ]
  }, {
    path: '/room/:number/:key',
    element: <SecureMainContainer />
  }
]
