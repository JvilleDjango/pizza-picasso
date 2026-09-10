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

app.get('/api/toppings', (_request, response) => {
  response.json(toppings)
})