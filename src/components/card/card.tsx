import type { MouseEvent } from 'react'
import { PlusCircle, Trash2 } from 'lucide-react'
import './card.module.scss'

type CardVariant = 'pizza' | 'topping'

type IngredientKind =
  | 'pepperoni'
  | 'sausage'
  | 'bacon'
  | 'beef'
  | 'ham'
  | 'cheese'
  | 'tomato'
  | 'basil'
  | 'mushroom'
  | 'pepper'
  | 'olive'
  | 'onion'
  | 'pineapple'
  | 'chicken'
  | 'generic'

interface CardsProps {
  data: string
  variant?: CardVariant
  onClick?: () => void
  onDelete?: () => void
}

const ingredientKind = (name: string): IngredientKind => {
  const value = name.toLowerCase()
  if (value.includes('pepperoni')) return 'pepperoni'
  if (value.includes('sausage')) return 'sausage'
  if (value.includes('bacon')) return 'bacon'
  if (value.includes('ground beef') || value.includes('beef') || value.includes('meat')) return 'beef'
  if (value.includes('ham') || value.includes('prosciutto')) return 'ham'
  if (value.includes('mozzarella') || value.includes('parmesan') || value.includes('ricotta') || value.includes('cheese')) return 'cheese'
  if (value.includes('tomato')) return 'tomato'
  if (value.includes('basil') || value.includes('spinach') || value.includes('arugula')) return 'basil'
  if (value.includes('mushroom')) return 'mushroom'
  if (value.includes('pepper')) return 'pepper'
  if (value.includes('olive')) return 'olive'
  if (value.includes('onion')) return 'onion'
  if (value.includes('pineapple')) return 'pineapple'
  if (value.includes('chicken')) return 'chicken'
  return 'generic'
}

const pizzaStyle = (name: string) => {
  const value = name.toLowerCase()
  if (value.includes('margherita')) return 'margherita'
  if (value.includes('four') && value.includes('cheese')) return 'four-cheese'
  if (value.includes('pepperoni')) return 'pepperoni'
  if (value.includes('veggie') || value.includes('vegetable')) return 'veggie'
  if (value.includes('hawaiian')) return 'hawaiian'
  if (value.includes('meat') || value.includes('sausage')) return 'meat'
  return 'classic'
}

const FlatIngredientArt = ({ name }: { name: string }) => {
  const kind = ingredientKind(name)

  return (
    <svg className={`ingredient-art ingredient-art--${kind}`} viewBox="0 0 160 110" aria-hidden="true">
      {kind === 'pepperoni' && <>
        <circle cx="58" cy="55" r="24" className="fill-meat-red" />
        <circle cx="102" cy="55" r="24" className="fill-meat-red" />
        <circle cx="51" cy="48" r="3" className="fill-meat-dark" />
        <circle cx="67" cy="62" r="3" className="fill-meat-dark" />
        <circle cx="95" cy="46" r="3" className="fill-meat-dark" />
        <circle cx="109" cy="64" r="3" className="fill-meat-dark" />
      </>}

      {kind === 'sausage' && <>
        <ellipse cx="48" cy="59" rx="25" ry="17" className="fill-sausage" />
        <ellipse cx="84" cy="48" rx="25" ry="17" className="fill-sausage" />
        <ellipse cx="116" cy="64" rx="23" ry="16" className="fill-sausage" />
        <circle cx="43" cy="55" r="2.5" className="fill-meat-dark" />
        <circle cx="88" cy="44" r="2.5" className="fill-meat-dark" />
        <circle cx="112" cy="67" r="2.5" className="fill-meat-dark" />
      </>}

      {kind === 'bacon' && <>
        <path d="M24 43c15-17 29 13 45-3s29 13 45-3 25 5 25 5l-8 21s-10-9-23 4-30-15-45 2-29-11-45 4z" className="fill-bacon" />
        <path d="M27 52c14-12 28 11 42-2s29 12 44-2 23 5 23 5" className="stroke-bacon-fat" />
      </>}

      {kind === 'beef' && <>
        <path d="M34 63l13-24 27-7 19 14 23-3 15 21-10 19-28 3-19-9-22 7z" className="fill-beef" />
        <path d="M48 53l13 8m17-14 10 9m17 2 8 9M65 72l12 5m22-9 10 5" className="stroke-meat-detail" />
      </>}

      {kind === 'ham' && <>
        <path d="M34 44c16-13 35-17 55-9l30 12-8 31-37-4-34 7z" className="fill-ham" />
        <path d="M42 54c20-7 42-5 66 7M47 67c21-4 40-1 56 6" className="stroke-ham-detail" />
      </>}

      {kind === 'cheese' && <>
        <path d="M38 37h84l-12 49H50z" className="fill-cheese" />
        <circle cx="64" cy="54" r="6" className="fill-cheese-hole" />
        <circle cx="96" cy="70" r="5" className="fill-cheese-hole" />
        <circle cx="105" cy="49" r="4" className="fill-cheese-hole" />
      </>}

      {kind === 'tomato' && <>
        <circle cx="80" cy="59" r="34" className="fill-tomato" />
        <path d="M80 24l7 12 14-4-9 11 10 10-15-3-7 12-5-13-15 2 11-10-8-11 14 5z" className="fill-basil" />
      </>}

      {kind === 'basil' && <>
        <path d="M78 83C46 76 38 50 52 31c23 4 37 22 28 52z" className="fill-basil" />
        <path d="M84 83c3-30 21-48 44-49 9 22-5 44-44 49z" className="fill-basil-light" />
        <path d="M80 83V42m6 36 26-28" className="stroke-leaf" />
      </>}

      {kind === 'mushroom' && <>
        <path d="M33 56c7-24 27-34 47-25 20-9 40 1 47 25z" className="fill-mushroom-cap" />
        <path d="M61 55h38l8 31H53z" className="fill-mushroom-stem" />
        <path d="M45 56h70" className="stroke-mushroom" />
      </>}

      {kind === 'pepper' && <>
        <path d="M38 75c-7-30 11-51 36-52 7 15 7 38-1 57z" className="fill-pepper-red" />
        <path d="M83 78c-8-25 6-47 29-51 11 14 13 36 5 55z" className="fill-pepper-yellow" />
        <path d="M72 27l8-11m30 15 8-12" className="stroke-stem" />
      </>}

      {kind === 'olive' && <>
        <ellipse cx="57" cy="58" rx="20" ry="27" className="fill-olive" />
        <ellipse cx="103" cy="58" rx="20" ry="27" className="fill-olive" />
        <ellipse cx="57" cy="58" rx="7" ry="10" className="fill-olive-hole" />
        <ellipse cx="103" cy="58" rx="7" ry="10" className="fill-olive-hole" />
      </>}

      {kind === 'onion' && <>
        <path d="M81 23c27 20 31 50 8 68-29 5-52-12-51-36 1-15 14-28 43-32z" className="fill-onion" />
        <path d="M80 29c17 18 17 39 2 56M63 34c-12 19-9 38 8 51M97 36c9 15 8 31-2 44" className="stroke-onion" />
      </>}

      {kind === 'pineapple' && <>
        <path d="M53 46h54l8 43H45z" className="fill-pineapple" />
        <path d="M80 45V18m-1 24-17-18m18 18 18-18m-9 20 19-9m-36 9-19-9" className="stroke-pineapple-leaf" />
        <path d="M54 55l48 24m-42 4 39-25" className="stroke-pineapple-detail" />
      </>}

      {kind === 'chicken' && <>
        <path d="M42 69c8-27 28-40 51-31 22 9 31 29 20 48-24 8-52 3-71-17z" className="fill-chicken" />
        <path d="M55 61c15-8 29-7 45 4M62 74c13-4 25-2 34 4" className="stroke-chicken-detail" />
      </>}

      {kind === 'generic' && <>
        <circle cx="80" cy="55" r="28" className="fill-generic" />
        <circle cx="80" cy="55" r="10" className="fill-generic-center" />
      </>}
    </svg>
  )
}

const FlatPizzaArt = ({ name }: { name: string }) => {
  const style = pizzaStyle(name)

  return (
    <svg className={`pizza-art pizza-art--${style}`} viewBox="0 0 160 120" aria-hidden="true">
      <circle cx="80" cy="60" r="47" className="pizza-crust" />
      <circle cx="80" cy="60" r="39" className="pizza-sauce" />
      <circle cx="80" cy="60" r="35" className="pizza-cheese" />

      {(style === 'pepperoni' || style === 'classic' || style === 'meat') && <>
        <circle cx="59" cy="43" r="7" className="pizza-pepperoni" />
        <circle cx="94" cy="43" r="7" className="pizza-pepperoni" />
        <circle cx="106" cy="70" r="7" className="pizza-pepperoni" />
        <circle cx="70" cy="79" r="7" className="pizza-pepperoni" />
      </>}

      {style === 'meat' && <>
        <ellipse cx="53" cy="67" rx="8" ry="5" className="pizza-sausage" />
        <ellipse cx="89" cy="83" rx="8" ry="5" className="pizza-sausage" />
        <path d="M77 36l10 6-7 9-11-4z" className="pizza-beef" />
      </>}

      {(style === 'margherita' || style === 'veggie' || style === 'classic') && <>
        <path d="M55 57c7-9 15-8 19 0-5 8-12 11-19 0z" className="pizza-basil" />
        <path d="M92 69c7-9 15-8 19 0-5 8-12 11-19 0z" className="pizza-basil" />
      </>}

      {style === 'margherita' && <>
        <circle cx="63" cy="74" r="7" className="pizza-tomato" />
        <circle cx="101" cy="49" r="7" className="pizza-tomato" />
      </>}

      {style === 'four-cheese' && <>
        <circle cx="56" cy="48" r="8" className="pizza-cheese-dot pizza-cheese-dot--one" />
        <circle cx="91" cy="42" r="8" className="pizza-cheese-dot pizza-cheese-dot--two" />
        <circle cx="104" cy="73" r="8" className="pizza-cheese-dot pizza-cheese-dot--three" />
        <circle cx="69" cy="80" r="8" className="pizza-cheese-dot pizza-cheese-dot--four" />
      </>}

      {style === 'veggie' && <>
        <path d="M48 73c8-8 15-8 22 0-7 8-14 8-22 0z" className="pizza-pepper-green" />
        <path d="M90 45c8-8 15-8 22 0-7 8-14 8-22 0z" className="pizza-pepper-red" />
        <ellipse cx="83" cy="81" rx="8" ry="5" className="pizza-mushroom" />
      </>}

      {style === 'hawaiian' && <>
        <rect x="51" y="42" width="13" height="13" rx="2" className="pizza-pineapple" />
        <rect x="93" y="45" width="13" height="13" rx="2" className="pizza-pineapple" />
        <rect x="78" y="76" width="13" height="13" rx="2" className="pizza-pineapple" />
        <path d="M62 65l14-7 9 9-15 8zM95 70l12-5 8 8-13 7z" className="pizza-ham" />
      </>}
    </svg>
  )
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
            <FlatIngredientArt name={data} />
          </div>
        ) : (
          <div className="pizza-visual" aria-hidden="true">
            <FlatPizzaArt name={data} />
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
