import { Outlet } from 'react-router'
import './main-layout.module.scss'

const MainLayout = () => {
  return (
    <section className="main-layout">
      <Outlet />
    </section>
  )
}

export default MainLayout
