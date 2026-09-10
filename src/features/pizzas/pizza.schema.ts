import { z } from 'zod'

export const pizzaSchema = z.object({
  name: z.string().trim().min(2, 'Give the pizza a name.').max(60),
  description: z.string().trim().min(8, 'Add a short description.').max(240),
  toppingIds: z.array(z.string()).min(1, 'Choose at least one topping.'),
  price: z.coerce.number().min(1, 'Price must be at least $1.').max(100),
})

export type PizzaFormValues = z.infer<typeof pizzaSchema>
