import ErrorBoundary from './components/error-boundary'
import { RouterProvider } from 'react-router'
import { router } from './routes/app-routes'

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}

export default App