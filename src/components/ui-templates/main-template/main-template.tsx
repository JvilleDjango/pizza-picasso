import type { ReactNode } from 'react'
import { Outlet } from 'react-router'
import type { NavigationItem } from '../../../configs/template.config'
import AccountMenu from '../../account-menu'
import Navigation from '../../navigation'
import PageHeader from '../../page-header'
import Header from '../../header'
import './main-template.module.scss'

interface MainTemplateProps {
  navigation: NavigationItem[]
  children?: ReactNode
}

const MainTemplate = ({ navigation, children = null }: MainTemplateProps) => {
  return (
    <section className="main-template">
      <header className="header-content">
        <PageHeader headers={navigation} />
        {children}
      </header>

      <aside className="left-content sub-navigation">
        <Header />
        <Navigation menu={navigation} />
        <div className="sidebar-account">
          <span className="sidebar-account-label">Account</span>
          <AccountMenu />
        </div>
      </aside>

      <main className="right-content">
        <Outlet />
      </main>
    </section>
  )
}

export default MainTemplate
