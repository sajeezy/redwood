import { Link, routes } from '@redwoodjs/router'

const BlogLayout = ({ children }) => {
  return (
    <>
      <h1>
        <Link to={routes.home()}>Redwood blog</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to={routes.about()}>About</Link>
          </li>
          <li>
            <Link to={routes.contact()}>Contact</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
