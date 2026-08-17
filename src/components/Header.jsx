import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import './Header.css'

export default function Header({ searchQuery, onSearchChange }) {
  const { user, logOut } = useAuth()

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

      <div className="header__auth">
        {user ? (
          <button className="header__logout" type="button" onClick={logOut}>
            Log out
          </button>
        ) : (
          <Link className="header__link" to="/auth">
            Log in
          </Link>
        )}
      </div>
    </header>
  )
}