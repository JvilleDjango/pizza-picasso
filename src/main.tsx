import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { queryClient } from './app/query-client'
import Spinner from './components/spinner'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
