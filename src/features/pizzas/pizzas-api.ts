import { apiGet, apiPatch, apiPost } from '../../api/api-client'
import type { PizzaGroups } from './types'

export interface PizzaMutationInput {
  category: string
  name: string
  toppings: string[]
}

export interface PizzaUpdateInput extends PizzaMutationInput {
  originalName: string
}

export function getPizzas(signal?: AbortSignal) {
  return apiGet<PizzaGroups>('/api/pizzas', signal)
}

export function createPizza(input: PizzaMutationInput) {
  return apiPost<{ category: string; name: string }, PizzaMutationInput>('/api/pizzas', input)
}

export function updatePizza(input: PizzaUpdateInput) {
  return apiPatch<{ category: string; name: string }, PizzaUpdateInput>('/api/pizzas', input)
}
