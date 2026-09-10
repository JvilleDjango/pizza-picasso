import { useQuery } from '@tanstack/react-query'
import { getToppings } from './toppings-api'

export function useToppings() {
  return useQuery({
    queryKey: ['toppings'],
    queryFn: ({ signal }) => getToppings(signal),
  })
}