import { createBrowserRouter, Navigate } from 'react-router'
import MainTemplate from '../components/ui-templates'
import TEMPLATE_CONFIG from '../configs/template.config'
import MainLayout from '../layouts/main-layout'
import NotFoundPage from '../pages/not-found-page'
import PizzaAdmin from '../pages/pizza-admin'
import PizzaManager from '../pages/pizza-manager'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <MainTemplate {...TEMPLATE_CONFIG} children={null} />,
        children: [
          { index: true, element: <Navigate replace to="/pizza-admin" /> },
          { path: 'pizza-admin', element: <PizzaAdmin /> },
          { path: 'pizza-manager', element: <PizzaManager /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])