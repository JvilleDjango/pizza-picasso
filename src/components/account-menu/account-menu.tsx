import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown, LogOut, UserRound } from 'lucide-react'
import { NavLink } from 'react-router'
import missingImage from '../../assets/pizza_placeholder.png'
import './account-menu.module.scss'

const AccountMenu = () => {
  return (
    <div className="user-account">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="account-button"
            aria-label="Open account menu"
          >
            <img className="account-avatar" src={missingImage} alt="" />
            <span className="account-name">Pablo Picasso</span>
            <ChevronDown aria-hidden="true" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            className="account-menu-content"
            sideOffset={8}
          >
            <DropdownMenu.Item asChild>
              <NavLink className="account-menu-item" to="/my-account">
                <UserRound aria-hidden="true" />
                <span>My account</span>
              </NavLink>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="account-menu-separator" />
            <DropdownMenu.Item
              className="account-menu-item"
              onSelect={(event) => event.preventDefault()}
            >
              <LogOut aria-hidden="true" />
              <span>Logout</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

export default AccountMenu
