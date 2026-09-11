import { Pizza } from 'lucide-react'
import './header.module.scss'

const Header = () => {
  return (
    <section className="mast-head" aria-label="Pizza Picasso">
      <div className="brand-mark" aria-hidden="true">
        <Pizza />
      </div>
      <div className="logo">
        <span className="brand-kicker">Pizzeria studio / 01</span>
        <h1>Pizza Picasso</h1>
        <p>Compose with intention.</p>
      </div>
    </section>
  )
}

export default Header
