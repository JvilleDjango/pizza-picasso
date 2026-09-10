import { NavLink } from 'react-router'
import type { NavigationItem } from '../../../configs/template.config'
import IconFactory from '../../icon-factory'

interface MenuItemProps {
  item: NavigationItem
}

const MenuItem = ({ item }: MenuItemProps) => {
  return (
    <li className="menu-list-item">
      <NavLink
        className={({ isActive }) => `menu-link${isActive ? ' active' : ''}`}
        to={item.route}
      >
        <span className="menu-link-content">
          <span className="menu-icon">
            <IconFactory iconName={item.icon} />
          </span>
          <span className="menu-label">{item.name}</span>
        </span>
      </NavLink>
    </li>
  )
}

export default MenuItem
