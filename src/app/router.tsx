import { createBrowserRouter } from 'react-router'
import { PizzaStudioPage } from '../pages/PizzaStudioPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PizzaStudioPage />,
  },
])
