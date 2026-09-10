import { apiGet } from '../../api/api-client'
import type { PizzaGroups } from './types'

export function getPizzas(signal?: AbortSignal) {
  return apiGet<PizzaGroups>('/api/pizzas', signal)
}