import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { z } from 'zod'
import { useToppings, type ToppingGroups } from '../../features/toppings'
import './form.dialog.module.scss'

const nameSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
})

interface FormDialogProps {
  type: string
  open: boolean
  onClose: () => void
  initialName?: string
}

const FormDialog = ({ type, open, onClose, initialName = '' }: FormDialogProps) => {
  const { data } = useToppings()
  const toppings: ToppingGroups = data ?? {}
  const [name, setName] = useState('')
  const [imageName, setImageName] = useState('')
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const showToppings = type.includes('pizza')
  const isEdit = type.startsWith('edit')
  const toppingEntries = Object.entries(toppings)

  useEffect(() => {
    if (open) {
      setName(isEdit ? initialName : '')
      setImageName('')
      setSelectedToppings([])
      setError(null)
      return
    }

    setName('')
    setImageName('')
    setSelectedToppings([])
    setError(null)
  }, [initialName, isEdit, open])

  const toggleTopping = (topping: string) => {
    setSelectedToppings((current) =>
      current.includes(topping)
        ? current.filter((item) => item !== topping)
        : [...current, topping],
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsed = nameSchema.safeParse({ name })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Name is required.')
      return
    }

    alert(
      JSON.stringify(
        {
          name: parsed.data.name,
          image: imageName,
          toppings: selectedToppings,
        },
        null,
        2,
      ),
    )
    onClose()
  }

  const title = isEdit ? `Edit ${initialName || 'pizza'}` : showToppings ? 'Create pizza' : 'Create topping'
  const description = showToppings
    ? isEdit
      ? 'Refine the pizza name and ingredient selection.'
      : 'Name the pizza and choose the ingredients your team can use.'
    : isEdit
      ? 'Update this topping.'
      : 'Add a new topping to the ingredient library.'

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="editor-dialog-overlay" />
        <Dialog.Content className="editor-dialog-content">
          <div className="editor-dialog-header">
            <div>
              <p className="editor-dialog-eyebrow">Pizza Picasso / menu editor</p>
              <Dialog.Title className="editor-dialog-title">{title}</Dialog.Title>
              <Dialog.Description className="editor-dialog-description">{description}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" className="editor-dialog-close" aria-label="Close dialog">
                <X aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="form-dialog">
            <div className="form-field">
              <label className="input-label" htmlFor="name">Name</label>
              <input
                id="name"
                className="input-field"
                name="name"
                value={name}
                autoFocus
                onChange={(event) => {
                  setName(event.target.value)
                  if (error) setError(null)
                }}
              />
              <p className={`helper-text${error ? ' helper-text--error' : ''}`} role={error ? 'alert' : undefined}>
                {error ?? 'Use a clear, unique name your team will recognize.'}
              </p>
            </div>

            <div className="form-field">
              <label className="input-label" htmlFor="image">Image</label>
              <input
                accept="image/*"
                className="input-field input-field--file"
                id="image"
                name="image"
                type="file"
                onChange={(event) => setImageName(event.target.files?.[0]?.name ?? '')}
              />
              <p className="helper-text">{imageName || 'Optional. The flat product illustration remains the default visual.'}</p>
            </div>

            {showToppings ? (
              <section className="topping-section" aria-labelledby="topping-section-title">
                <div className="topping-section-heading">
                  <div>
                    <p className="section-kicker">Ingredients</p>
                    <h3 id="topping-section-title">Choose toppings</h3>
                  </div>
                  <span className="selection-count">{selectedToppings.length} selected</span>
                </div>

                <div className="topping-groups">
                  {toppingEntries.map(([category, items]) => (
                    <section className="topping-group" key={category}>
                      <header>{category}</header>
                      <div className="topping-section-grid">
                        {items.map((topping) => {
                          const isSelected = selectedToppings.includes(topping)
                          return (
                            <button
                              key={topping}
                              type="button"
                              className={`topping-chip${isSelected ? ' active' : ''}`}
                              aria-pressed={isSelected}
                              onClick={() => toggleTopping(topping)}
                            >
                              {topping}
                            </button>
                          )
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="editor-dialog-actions">
              <Dialog.Close asChild>
                <button type="button" className="editor-dialog-button">Cancel</button>
              </Dialog.Close>
              <button type="submit" className="editor-dialog-button editor-dialog-button-primary">
                {isEdit ? 'Save changes' : showToppings ? 'Create pizza' : 'Create topping'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FormDialog
