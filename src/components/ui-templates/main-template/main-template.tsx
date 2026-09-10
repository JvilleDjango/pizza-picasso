import type { ReactNode } from 'react'
import { Outlet } from 'react-router'
import type { NavigationItem } from '../../../configs/template.config'
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
      </aside>
      <aside className="right-content">
        <Outlet />
      </aside>
    </section>
  )
}

export default MainTemplate
