import { ArrowUpRight, Plus, Sparkles } from 'lucide-react'

const pizzas = [
  {
    name: 'The Margherita',
    note: 'San Marzano · fior di latte · basil · olive oil',
    price: '$18',
    status: 'House classic',
  },
  {
    name: 'Calabrian Heat',
    note: 'Soppressata · calabrian chile · hot honey · pecorino',
    price: '$24',
    status: 'Chef favorite',
  },
  {
    name: 'Forest',
    note: 'Wild mushroom · taleggio · thyme · roasted garlic',
    price: '$22',
    status: 'Seasonal',
  },
]

const toppings = ['Fior di latte', 'Soppressata', 'Calabrian chile', 'Wild mushroom', 'Basil', 'Pecorino']

export function PizzaStudioPage() {
  return (
    <main className="studio-shell">
      <header className="studio-header frame-grid">
        <a className="wordmark" href="#top" aria-label="Pizza Picasso home">
          PIZZA <span>PICASSO</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#pizzas">Pizzas</a>
          <a href="#pantry">Pantry</a>
          <a href="#studio">Studio</a>
        </nav>
        <button className="icon-action" type="button" aria-label="Create a pizza">
          <Plus size={18} />
        </button>
      </header>

      <section className="hero frame-grid" id="top">
        <div className="hero-index">PP / 01</div>
        <div className="hero-copy">
          <p className="eyebrow">Pizzeria operating studio</p>
          <h1>
            Make the menu feel as considered as the <em>pizza.</em>
          </h1>
          <p className="hero-lede">
            A modern workspace for composing pizzas, organizing ingredients, and shaping a menu with the same care as the food itself.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" type="button">
              Create pizza <ArrowUpRight size={16} />
            </button>
            <a className="text-link" href="#pizzas">View menu system</a>
          </div>
        </div>
        <aside className="hero-note">
          <span>Kitchen note / 07</span>
          <p>Less dashboard. More atelier.</p>
          <p>Editorial structure for a tactile, ingredient-led product.</p>
        </aside>
      </section>

      <section className="manifesto-band">
        <div className="manifesto frame-grid">
          <div className="section-number">02</div>
          <div>
            <p className="eyebrow">The system</p>
            <h2>Recognition before administration.</h2>
          </div>
          <p className="manifesto-copy">
            Ingredients should look like ingredients. Pizzas should read like a menu. Management controls stay precise, but the product should never feel like generic CRUD wearing a restaurant logo.
          </p>
        </div>
      </section>

      <section className="menu-section frame-grid" id="pizzas">
        <div className="section-number">03</div>
        <div className="section-heading">
          <p className="eyebrow">Menu / pizzas</p>
          <h2>The house collection.</h2>
        </div>
        <div className="pizza-list">
          {pizzas.map((pizza, index) => (
            <article className="pizza-row" key={pizza.name}>
              <span className="pizza-index">0{index + 1}</span>
              <div className="pizza-name">
                <span>{pizza.status}</span>
                <h3>{pizza.name}</h3>
              </div>
              <p>{pizza.note}</p>
              <strong>{pizza.price}</strong>
              <button type="button" aria-label={`Edit ${pizza.name}`}>Edit ↗</button>
            </article>
          ))}
        </div>
      </section>

      <section className="pantry-section" id="pantry">
        <div className="frame-grid pantry-inner">
          <div className="section-number">04</div>
          <div className="section-heading">
            <p className="eyebrow">Pantry / ingredients</p>
            <h2>A visual ingredient library.</h2>
          </div>
          <div className="pantry-grid">
            {toppings.map((topping, index) => (
              <article className="ingredient-card" key={topping}>
                <div className={`ingredient-mark ingredient-${index + 1}`} aria-hidden="true" />
                <span>Ingredient / 0{index + 1}</span>
                <h3>{topping}</h3>
                <button type="button">View details</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-section frame-grid" id="studio">
        <div className="section-number">05</div>
        <div className="studio-intro">
          <p className="eyebrow">Composition studio</p>
          <h2>Build in context.</h2>
          <p>
            The next step is a true pizza composition workspace: ingredient selection, live pizza preview, price and availability rules, accessible form states, and optional AI-assisted combinations.
          </p>
        </div>
        <div className="studio-card">
          <div className="studio-card-topline">
            <span>AI-assisted concept</span>
            <Sparkles size={18} aria-hidden="true" />
          </div>
          <h3>“Something earthy, vegetarian, and upscale.”</h3>
          <p>Suggest a composition from the existing pantry, then let the chef accept, reject, or refine every choice.</p>
          <button className="button button-light" type="button">Explore concept <ArrowUpRight size={16} /></button>
        </div>
      </section>

      <footer className="studio-footer frame-grid">
        <span>Pizza Picasso / Product evolution</span>
        <span>React 19 · TypeScript · Vite · Radix</span>
      </footer>
    </main>
  )
}
