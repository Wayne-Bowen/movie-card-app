import { Link } from 'react-router-dom'
import './Header.css'

export default function Header({ searchQuery, onSearchChange }) {
  return (
    <header className="header">
      <nav className="header__nav" aria-label="Main navigation">
        <Link className="header__link" to="/">
          Home
        </Link>
        <Link className="header__link" to="/favourites">
          Favourites
        </Link>
      </nav>

      <div className="header__search">
        <label className="header__search-label" htmlFor="movie-search">
          Search movies
        </label>
        <input
          id="movie-search"
          className="header__search-input"
          type="search"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
    </header>
  )
}
