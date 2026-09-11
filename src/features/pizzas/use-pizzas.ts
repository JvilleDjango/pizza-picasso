import { useQuery } from '@tanstack/react-query'
import { getPizzas } from './pizzas-api'

export function usePizzas() {
  return useQuery({
    queryKey: ['pizzas'],
    queryFn: ({ signal }) => getPizzas(signal),
  })
}