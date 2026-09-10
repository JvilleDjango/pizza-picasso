import { apiGet, apiPatch, apiPost } from '../../api/api-client'
import type { ToppingGroups } from './types'

export interface ToppingMutationInput {
  category: string
  name: string
}

export interface ToppingUpdateInput extends ToppingMutationInput {
  originalName: string
}

export function getToppings(signal?: AbortSignal) {
  return apiGet<ToppingGroups>('/api/toppings', signal)
}

export function createTopping(input: ToppingMutationInput) {
  return apiPost<{ category: string; name: string }, ToppingMutationInput>('/api/toppings', input)
}

export function updateTopping(input: ToppingUpdateInput) {
  return apiPatch<{ category: string; name: string }, ToppingUpdateInput>('/api/toppings', input)
}
