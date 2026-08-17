import MovieCard from '../components/MovieCard.jsx'
import './Favourites.css'

export default function Favourites({ favorites, onToggleFavorite }) {
  return (
    <section className="favourites" aria-labelledby="favourites-title">
      <h1 id="favourites-title" className="favourites__title">
        Favourites
      </h1>

      {favorites.length === 0 && <p>No favourites yet.</p>}

      <div className="favourites__movie-list" aria-live="polite">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  )
}
