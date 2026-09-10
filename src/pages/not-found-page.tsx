import { Link } from 'react-router'

const NotFoundPage = () => {
  return (
    <section>
      <h2>Page not found</h2>
      <p>The route you requested does not exist in Pizza Picasso.</p>
      <Link to="/pizza-admin">Return to pizza admin</Link>
    </section>
  )
}

export default NotFoundPage