import * as Tabs from '@radix-ui/react-tabs'
import { Grid2x2, List, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import Cards from '../../components/card'
import FormDialog from '../../components/modal/form.dialog'
import Modal from '../../components/modal'
import Spinner from '../../components/spinner'
import { useToppings, type ToppingGroups } from '../../features/toppings'
import './pizza-admin.module.scss'

const PizzaAdmin = () => {
  const { data, isError, isLoading } = useToppings()
  const toppings: ToppingGroups = data ?? {}
  const categories = Object.keys(toppings)
  const [activeCategory, setActiveCategory] = useState('')
  const [openFormDialog, setOpenFormDialog] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [dialogType, setDialogType] = useState('')

  useEffect(() => {
    if (!activeCategory && categories[0]) {
      setActiveCategory(categories[0])
    }
  }, [activeCategory, categories])

  const handleAdd = () => {
    setOpenFormDialog(true)
    setDialogType('add topping')
  }

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleCardAction = (action: 'edit' | 'delete') => {
    if (action === 'edit') {
      setOpenFormDialog(true)
      setDialogType('edit topping')
      return
    }

    setOpenModal(true)
  }

  if (isLoading) {
    return (
      <section className="pizza-admin">
        <Spinner />
      </section>
    )
  }

  if (isError) {
    return (
      <section className="pizza-admin">
        <p className="empty-state">We could not load toppings right now.</p>
      </section>
    )
  }

  return (
    <section className="pizza-admin">
      <div className="pizza-admin-navigation">
        <Tabs.Root value={activeCategory} onValueChange={setActiveCategory}>
          <div className="tabs-toolbar">
            <Tabs.List className="tabs-list" aria-label="Topping categories">
              {categories.map((category) => (
                <Tabs.Trigger className="tabs-trigger" key={category} value={category}>
                  {category}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <button type="button" className="primary-button" onClick={handleAdd}>
              <Plus aria-hidden="true" />
              <span>Add</span>
            </button>
          </div>

          {categories.map((category) => (
            <Tabs.Content className="tabs-content toppings-list" key={category} value={category}>
              <div className="actions-container">
                <div className="actions-left">
                  <header>{category}</header>
                </div>
                <div className="actions-right">
                  <button type="button" className="icon-button" aria-label="View list">
                    <List aria-hidden="true" />
                  </button>
                  <button type="button" className="icon-button" aria-label="View grid">
                    <Grid2x2 aria-hidden="true" />
                  </button>
                  <button type="button" className="primary-button" onClick={handleAdd}>
                    <Plus aria-hidden="true" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="toppings-grid">
                {toppings[category]?.map((topping) => (
                  <Cards
                    data={topping}
                    key={topping}
                    onClick={() => handleCardAction('edit')}
                    onDelete={() => handleCardAction('delete')}
                  />
                ))}
                <Cards data="Add" onClick={handleAdd} />
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>

      <FormDialog open={openFormDialog} onClose={handleCloseFormDialog} type={dialogType} />
      <Modal open={openModal} onClose={handleCloseModal} />
    </section>
  )
}

export default PizzaAdmin
