import { Pizza } from 'lucide-react'
import './header.module.scss'

const Header = () => {
  return (
    <section className="mast-head">
      <div className="logo">
        <Pizza aria-hidden="true" />
        <h1>Pizza Picasso</h1>
      </div>
    </section>
  )
}

export default Header
