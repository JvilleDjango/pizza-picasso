import { apiGet } from '../../api/api-client'
import type { ToppingGroups } from './types'

export function getToppings(signal?: AbortSignal) {
  return apiGet<ToppingGroups>('/api/toppings', signal)
}