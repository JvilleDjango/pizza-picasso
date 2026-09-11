import type { NavigationItem } from '../../configs/template.config'
import MenuItem from './components'
import './navigation.module.scss'

interface NavigationProps {
  menu: NavigationItem[]
}

const Navigation = ({ menu }: NavigationProps) => {
  return (
    <nav className="helm">
      <ul className="menu-list">
        {menu.map((item) => (
          <MenuItem item={item} key={item.route} />
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
