import express from 'express'
import { pizzas } from './data/pizzas.ts'
import { toppings } from './data/toppings.ts'

export const app = express()

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/pizzas', (_request, response) => {
  response.json(pizzas)
})

app.post('/api/pizzas', (request, response) => {
  const { category, name } = request.body as { category?: string; name?: string; toppings?: string[] }
  const trimmedName = name?.trim()
  const group = category ? pizzas[category] : undefined

  if (!category || !group) {
    return response.status(400).json({ error: { message: 'Choose a valid pizza category.' } })
  }
  if (!trimmedName) {
    return response.status(400).json({ error: { message: 'Pizza name is required.' } })
  }
  if (Object.values(pizzas).flat().some((item) => item.toLowerCase() === trimmedName.toLowerCase())) {
    return response.status(409).json({ error: { message: 'A pizza with that name already exists.' } })
  }

  group.push(trimmedName)
  return response.status(201).json({ category, name: trimmedName })
})

app.patch('/api/pizzas', (request, response) => {
  const { category, originalName, name } = request.body as { category?: string; originalName?: string; name?: string; toppings?: string[] }
  const trimmedName = name?.trim()
  const group = category ? pizzas[category] : undefined

  if (!category || !group || !originalName) {
    return response.status(400).json({ error: { message: 'Pizza category and original name are required.' } })
  }
  if (!trimmedName) {
    return response.status(400).json({ error: { message: 'Pizza name is required.' } })
  }

  const index = group.findIndex((item) => item === originalName)
  if (index < 0) {
    return response.status(404).json({ error: { message: 'Pizza not found.' } })
  }

  const duplicate = Object.values(pizzas).flat().some(
    (item) => item !== originalName && item.toLowerCase() === trimmedName.toLowerCase(),
  )
  if (duplicate) {
    return response.status(409).json({ error: { message: 'A pizza with that name already exists.' } })
  }

  group[index] = trimmedName
  return response.json({ category, name: trimmedName })
})

app.get('/api/toppings', (_request, response) => {
  response.json(toppings)
})

app.post('/api/toppings', (request, response) => {
  const { category, name } = request.body as { category?: string; name?: string }
  const trimmedName = name?.trim()
  const group = category ? toppings[category] : undefined

  if (!category || !group) {
    return response.status(400).json({ error: { message: 'Choose a valid topping category.' } })
  }
  if (!trimmedName) {
    return response.status(400).json({ error: { message: 'Topping name is required.' } })
  }
  if (Object.values(toppings).flat().some((item) => item.toLowerCase() === trimmedName.toLowerCase())) {
    return response.status(409).json({ error: { message: 'A topping with that name already exists.' } })
  }

  group.push(trimmedName)
  return response.status(201).json({ category, name: trimmedName })
})

app.patch('/api/toppings', (request, response) => {
  const { category, originalName, name } = request.body as { category?: string; originalName?: string; name?: string }
  const trimmedName = name?.trim()
  const group = category ? toppings[category] : undefined

  if (!category || !group || !originalName) {
    return response.status(400).json({ error: { message: 'Topping category and original name are required.' } })
  }
  if (!trimmedName) {
    return response.status(400).json({ error: { message: 'Topping name is required.' } })
  }

  const index = group.findIndex((item) => item === originalName)
  if (index < 0) {
    return response.status(404).json({ error: { message: 'Topping not found.' } })
  }

  const duplicate = Object.values(toppings).flat().some(
    (item) => item !== originalName && item.toLowerCase() === trimmedName.toLowerCase(),
  )
  if (duplicate) {
    return response.status(409).json({ error: { message: 'A topping with that name already exists.' } })
  }

  group[index] = trimmedName
  return response.json({ category, name: trimmedName })
})
