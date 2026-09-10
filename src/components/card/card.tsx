import type { MouseEvent } from 'react'
import { PlusCircle, Trash2 } from 'lucide-react'
import './card.module.scss'

type CardVariant = 'pizza' | 'topping'

interface CardsProps {
  data: string
  variant?: CardVariant
  onClick?: () => void
  onDelete?: () => void
}

const toppingGlyph = (name: string) => {
  const value = name.toLowerCase()
  if (value.includes('mozzarella') || value.includes('parmesan') || value.includes('ricotta') || value.includes('cheese')) return '🧀'
  if (value.includes('tomato')) return '🍅'
  if (value.includes('basil') || value.includes('spinach') || value.includes('arugula')) return '🌿'
  if (value.includes('mushroom')) return '🍄'
  if (value.includes('pepper')) return '🌶️'
  if (value.includes('olive')) return '🫒'
  if (value.includes('onion')) return '🧅'
  if (value.includes('pineapple')) return '🍍'
  if (value.includes('chicken')) return '🍗'
  if (value.includes('bacon') || value.includes('ham') || value.includes('prosciutto')) return '🥓'
  if (value.includes('sausage') || value.includes('beef') || value.includes('meat')) return '🥩'
  return '✦'
}

const pizzaStyle = (name: string) => {
  const value = name.toLowerCase()
  if (value.includes('margherita')) return 'margherita'
  if (value.includes('four') && value.includes('cheese')) return 'four-cheese'
  if (value.includes('pepperoni')) return 'pepperoni'
  if (value.includes('veggie') || value.includes('vegetable')) return 'veggie'
  if (value.includes('hawaiian')) return 'hawaiian'
  return 'classic'
}

const Cards = ({ data, variant = 'pizza', onClick, onDelete }: CardsProps) => {
  const isAddCard = data === 'Add'

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDelete?.()
  }

  return (
    <article className={`card card--${variant} ${isAddCard ? 'add' : ''}`}>
      {!isAddCard ? (
        <div className="card-header">
          <span className="card-kind">{variant}</span>
          <button type="button" className="card-menu" aria-label={`Delete ${data}`} onClick={handleDelete}>
            <Trash2 aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <button type="button" className="card-action" onClick={onClick}>
        {isAddCard ? (
          <PlusCircle className="card-add-icon" aria-hidden="true" />
        ) : variant === 'topping' ? (
          <div className="ingredient-visual" aria-hidden="true">
            <span>{toppingGlyph(data)}</span>
          </div>
        ) : (
          <div className={`pizza-visual pizza-visual--${pizzaStyle(data)}`} aria-hidden="true">
            <span className="pizza-slice pizza-slice--one" />
            <span className="pizza-slice pizza-slice--two" />
            <span className="pizza-slice pizza-slice--three" />
            <span className="pizza-herb pizza-herb--one" />
            <span className="pizza-herb pizza-herb--two" />
          </div>
        )}

        <div className="card-content">
          <h3 className="card-title">{data}</h3>
          {!isAddCard ? <span className="card-edit-hint">Open to edit</span> : null}
        </div>
      </button>
    </article>
  )
}

export default Cards
