import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard.jsx'
import './Home.css'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_BASE = 'https://api.themoviedb.org/3'

export default function Home({ searchQuery, favorites, onToggleFavorite }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const favoriteIds = new Set(favorites.map((movie) => movie.id))

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = searchQuery
          ? `${API_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`
          : `${API_BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch movies')
        const data = await res.json()
        setMovies(data.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [searchQuery])

  return (
    <section className="home" aria-labelledby="home-title">
      <h1 id="home-title" className="home__title">
        Movies
      </h1>

      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>No movies found.</p>
      )}

      <div className="home__movie-list" aria-live="polite">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favoriteIds.has(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  )
}
