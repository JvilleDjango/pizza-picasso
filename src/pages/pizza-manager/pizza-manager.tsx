import * as Tabs from '@radix-ui/react-tabs'
import { Grid2x2, List, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import Cards from '../../components/card'
import FormDialog from '../../components/modal/form.dialog'
import Modal from '../../components/modal'
import Spinner from '../../components/spinner'
import { usePizzas, type PizzaGroups } from '../../features/pizzas'
import './pizza-manager.module.scss'

const PizzaManager = () => {
  const { data, isError, isLoading } = usePizzas()
  const pizzas: PizzaGroups = data ?? {}
  const categories = Object.keys(pizzas)
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
    setDialogType('add pizza')
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
      setDialogType('edit pizza')
      return
    }

    setOpenModal(true)
  }

  if (isLoading) {
    return (
      <section className="pizza-manager">
        <Spinner />
      </section>
    )
  }

  if (isError) {
    return (
      <section className="pizza-manager">
        <p className="empty-state">We could not load pizzas right now.</p>
      </section>
    )
  }

  return (
    <section className="pizza-manager">
      <div className="pizza-manager-navigation">
        <Tabs.Root value={activeCategory} onValueChange={setActiveCategory}>
          <div className="tabs-toolbar">
            <Tabs.List className="tabs-list" aria-label="Pizza categories">
              {categories.map((category) => (
                <Tabs.Trigger className="tabs-trigger" key={category} value={category}>
                  {category} Pizzas
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <button type="button" className="primary-button" onClick={handleAdd}>
              <Plus aria-hidden="true" />
              <span>Add</span>
            </button>
          </div>

          {categories.map((category) => (
            <Tabs.Content className="tabs-content pizza-list" key={category} value={category}>
              <div className="actions-container">
                <div className="actions-left">
                  <header>{category} Pizzas</header>
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

              <div className="pizza-grid">
                {pizzas[category]?.map((pizza) => (
                  <Cards
                    data={pizza}
                    key={pizza}
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

export default PizzaManager
