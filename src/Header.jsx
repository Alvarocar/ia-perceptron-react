import { Link } from "react-router-dom"

const Header = () => {

  return (
    <header>
      <nav>
        <ul>
          <li><Link>2 Entradas</Link></li>
          <li><Link>4 Entradas</Link></li>
        </ul>
      </nav>
    </header>
  )
}