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

export interface PizzaDetail {
  name: string
  toppings: string[]
}

export function getPizzas(signal?: AbortSignal) {
  return apiGet<PizzaGroups>('/api/pizzas', signal)
}

export function getPizzaDetail(name: string, signal?: AbortSignal) {
  return apiGet<PizzaDetail>(`/api/pizzas/${encodeURIComponent(name)}`, signal)
}

export function createPizza(input: PizzaMutationInput) {
  return apiPost<{ category: string; name: string; toppings: string[] }, PizzaMutationInput>('/api/pizzas', input)
}

export function updatePizza(input: PizzaUpdateInput) {
  return apiPatch<{ category: string; name: string; toppings: string[] }, PizzaUpdateInput>('/api/pizzas', input)
}
