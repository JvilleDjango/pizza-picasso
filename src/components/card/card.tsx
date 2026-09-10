import type { MouseEvent } from 'react'
import { PlusCircle, Trash2 } from 'lucide-react'
import missingImage from '../../assets/pizza_placeholder.png'
import './card.module.scss'

interface CardsProps {
  data: string
  onClick?: () => void
  onDelete?: () => void
}

const Cards = ({ data, onClick, onDelete }: CardsProps) => {
  const isAddCard = data === 'Add'

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDelete?.()
  }

  return (
    <article className={`card ${isAddCard ? 'add' : ''}`}>
      {!isAddCard ? (
        <div className="card-header">
          <button
            type="button"
            className="card-menu"
            aria-label={`Delete ${data}`}
            onClick={handleDelete}
          >
            <Trash2 aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <button type="button" className="card-action" onClick={onClick}>
        {isAddCard ? (
          <PlusCircle className="card-add-icon" aria-hidden="true" />
        ) : (
          <img className="card-image" src={missingImage} alt="" />
        )}

        <div className="card-content">
          <h3 className="card-title">{data}</h3>
        </div>
      </button>
    </article>
  )
}

export default Cards
