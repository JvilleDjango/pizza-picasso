const express = require('express')
const { onRequest } = require('firebase-functions/v2/https')

const pizzas = {
  Cheese: ['Margherita', 'Four Cheese', 'Mozzarella', 'Parmesan', 'Ricotta', 'White Pizza', 'Quattro Formaggi', 'Alfredo Pizza'],
  Meats: ["Pepperoni Lover's", "Meat Lover's", 'Hawaiian', 'Bacon Deluxe', 'Sausage Supreme', 'BBQ Chicken', 'Buffalo Chicken', 'Canadian Bacon', 'Supreme', 'Taco Pizza'],
  Veggies: ['Vegetarian', 'Mushroom Lovers', 'Spinach and Feta', 'Greek Veggie', 'Vegan Delight', 'Artichoke and Olive', 'Roasted Veggie', 'Pesto Veggie', 'Tomato and Basil', 'Garlic and Onion'],
  Specialty: ['BBQ Ranch', 'Pineapple Express', 'Tex-Mex', 'Truffle Shuffle', 'Mediterranean', 'Seafood Supreme', 'Caprese', 'Thai Curry', 'Breakfast Pizza', 'Tandoori Delight'],
}

const toppings = {
  Meats: ['Pepperoni', 'Sausage', 'Bacon', 'Ground Beef', 'Ham', 'Chicken', 'Salami', 'Canadian Bacon', 'Anchovies', 'Prosciutto'],
  Veggies: ['Mushrooms', 'Green Peppers', 'Onions', 'Black Olives', 'Green Olives', 'Tomatoes', 'Spinach', 'Artichoke Hearts', 'Red Onions', 'Broccoli', 'Jalapeños', 'Banana Peppers', 'Pineapple', 'Sun-Dried Tomatoes', 'Roasted Red Peppers', 'Caramelized Onions', 'Zucchini', 'Asparagus', 'Kalamata Olives', 'Avocado'],
  Spices: ['Fresh Oregano', 'Dill', 'Garlic', 'Fresh Basil', 'Crushed Red Pepper Flakes', 'Black Pepper', 'Rosemary', 'Thyme', 'Parsley', 'Italian Seasoning'],
  Extras: ['Extra Cheese', 'Feta Cheese', 'Goat Cheese', 'Blue Cheese', 'Cheddar Cheese', 'Parmesan Cheese', 'Ricotta Cheese', 'Sour Cream', 'BBQ Sauce', 'Buffalo Sauce', 'Pesto Sauce', 'Alfredo Sauce', 'Olive Oil Drizzle', 'Balsamic Glaze', 'Sriracha Sauce', 'Honey', 'Truffle Oil', 'Sliced Hard-Boiled Eggs'],
}

const pizzaToppings = {}
const app = express()
app.use(express.json())

const apiInfo = {
  name: 'Pizza Picasso API',
  version: '0.2.0',
  endpoints: {
    health: 'GET /api/health',
    pizzas: 'GET /api/pizzas',
    pizzaDetail: 'GET /api/pizzas/:name',
    createPizza: 'POST /api/pizzas',
    updatePizza: 'PATCH /api/pizzas',
    toppings: 'GET /api/toppings',
    createTopping: 'POST /api/toppings',
    updateTopping: 'PATCH /api/toppings',
  },
}

app.get('/', (_request, response) => response.json(apiInfo))
app.get('/api', (_request, response) => response.json(apiInfo))
app.get('/api/health', (_request, response) => response.json({ status: 'ok', service: apiInfo.name, version: apiInfo.version }))
app.get('/api/pizzas', (_request, response) => response.json(pizzas))
app.get('/api/pizzas/:name', (request, response) => {
  const name = decodeURIComponent(request.params.name)
  const exists = Object.values(pizzas).flat().includes(name)
  if (!exists) return response.status(404).json({ error: { message: 'Pizza not found.' } })
  return response.json({ name, toppings: pizzaToppings[name] ?? [] })
})

app.post('/api/pizzas', (request, response) => {
  const { category, name, toppings: selectedToppings = [] } = request.body ?? {}
  const trimmedName = name?.trim()
  const group = category ? pizzas[category] : undefined
  if (!category || !group) return response.status(400).json({ error: { message: 'Choose a valid pizza category.' } })
  if (!trimmedName) return response.status(400).json({ error: { message: 'Pizza name is required.' } })
  if (Object.values(pizzas).flat().some((item) => item.toLowerCase() === trimmedName.toLowerCase())) {
    return response.status(409).json({ error: { message: 'A pizza with that name already exists.' } })
  }
  group.push(trimmedName)
  pizzaToppings[trimmedName] = [...selectedToppings]
  return response.status(201).json({ category, name: trimmedName, toppings: pizzaToppings[trimmedName] })
})

app.patch('/api/pizzas', (request, response) => {
  const { category, originalName, name, toppings: selectedToppings = [] } = request.body ?? {}
  const trimmedName = name?.trim()
  const group = category ? pizzas[category] : undefined
  if (!category || !group || !originalName) return response.status(400).json({ error: { message: 'Pizza category and original name are required.' } })
  if (!trimmedName) return response.status(400).json({ error: { message: 'Pizza name is required.' } })
  const index = group.findIndex((item) => item === originalName)
  if (index < 0) return response.status(404).json({ error: { message: 'Pizza not found.' } })
  const duplicate = Object.values(pizzas).flat().some((item) => item !== originalName && item.toLowerCase() === trimmedName.toLowerCase())
  if (duplicate) return response.status(409).json({ error: { message: 'A pizza with that name already exists.' } })
  group[index] = trimmedName
  if (originalName !== trimmedName) delete pizzaToppings[originalName]
  pizzaToppings[trimmedName] = [...selectedToppings]
  return response.json({ category, name: trimmedName, toppings: pizzaToppings[trimmedName] })
})

app.get('/api/toppings', (_request, response) => response.json(toppings))
app.post('/api/toppings', (request, response) => {
  const { category, name } = request.body ?? {}
  const trimmedName = name?.trim()
  const group = category ? toppings[category] : undefined
  if (!category || !group) return response.status(400).json({ error: { message: 'Choose a valid topping category.' } })
  if (!trimmedName) return response.status(400).json({ error: { message: 'Topping name is required.' } })
  if (Object.values(toppings).flat().some((item) => item.toLowerCase() === trimmedName.toLowerCase())) {
    return response.status(409).json({ error: { message: 'A topping with that name already exists.' } })
  }
  group.push(trimmedName)
  return response.status(201).json({ category, name: trimmedName })
})

app.patch('/api/toppings', (request, response) => {
  const { category, originalName, name } = request.body ?? {}
  const trimmedName = name?.trim()
  const group = category ? toppings[category] : undefined
  if (!category || !group || !originalName) return response.status(400).json({ error: { message: 'Topping category and original name are required.' } })
  if (!trimmedName) return response.status(400).json({ error: { message: 'Topping name is required.' } })
  const index = group.findIndex((item) => item === originalName)
  if (index < 0) return response.status(404).json({ error: { message: 'Topping not found.' } })
  const duplicate = Object.values(toppings).flat().some((item) => item !== originalName && item.toLowerCase() === trimmedName.toLowerCase())
  if (duplicate) return response.status(409).json({ error: { message: 'A topping with that name already exists.' } })
  group[index] = trimmedName
  return response.json({ category, name: trimmedName })
})

exports.api = onRequest({ region: 'us-central1' }, app)
