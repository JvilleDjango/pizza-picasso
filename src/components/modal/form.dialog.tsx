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
}

const FormDialog = ({ type, open, onClose }: FormDialogProps) => {
  const { data } = useToppings()
  const toppings: ToppingGroups = data ?? {}
  const [name, setName] = useState('')
  const [imageName, setImageName] = useState('')
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const showToppings = type.includes('pizza')
  const toppingEntries = Object.entries(toppings)

  useEffect(() => {
    if (!open) {
      setName('')
      setImageName('')
      setSelectedToppings([])
      setError(null)
    }
  }, [open])

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
            <Dialog.Title className="editor-dialog-title">{type}</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" className="editor-dialog-close" aria-label="Close dialog">
                <X aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="form-dialog">
            <div>
              <label className="input-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="input-field"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  if (error) setError(null)
                }}
              />
              <p className="helper-text" role={error ? 'alert' : undefined}>
                {error ?? 'Use a unique name for each item.'}
              </p>
            </div>

            <div>
              <label className="input-label" htmlFor="image">
                Upload image
              </label>
              <input
                accept="image/*"
                className="input-field"
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  setImageName(event.target.files?.[0]?.name ?? '')
                }}
              />
              {imageName ? <p className="helper-text">{imageName}</p> : null}
            </div>

            {showToppings ? (
              <section className="topping-section">
                {toppingEntries.map(([category, items]) => (
                  <div key={category}>
                    <header>{category}</header>
                    <div className="topping-section-grid">
                      {items.map((topping) => {
                        const isSelected = selectedToppings.includes(topping)

                        return (
                          <button
                            key={topping}
                            type="button"
                            className={`topping-chip${isSelected ? ' active' : ''}`}
                            onClick={() => toggleTopping(topping)}
                          >
                            {topping}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </section>
            ) : null}

            <div className="editor-dialog-actions">
              <Dialog.Close asChild>
                <button type="button" className="editor-dialog-button">
                  Cancel
                </button>
              </Dialog.Close>
              <button type="submit" className="editor-dialog-button editor-dialog-button-primary">
                Save
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FormDialog
