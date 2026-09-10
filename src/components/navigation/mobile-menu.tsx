import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { NavigationItem } from '../../configs/template.config'
import MenuItem from './components'
import './navigation.module.scss'

interface MobileMenuProps {
  menu: NavigationItem[]
}

const MobileMenu = ({ menu }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="helm mobile">
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <button type="button" className="mobile-trigger" aria-label="Open menu">
            <Menu aria-hidden="true" />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="mobile-overlay" />
          <Dialog.Content className="mobile-drawer">
            <div className="mobile-drawer-header">
              <Dialog.Title className="mobile-title">Navigation</Dialog.Title>
              <Dialog.Close asChild>
                <button type="button" className="mobile-close" aria-label="Close menu">
                  <X aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>

            <ul className="menu-list menu-list--mobile">
              {menu.map((item) => (
                <MenuItem item={item} key={item.route} />
              ))}
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  )
}

export default MobileMenu
