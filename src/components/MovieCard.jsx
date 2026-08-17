import './MovieCard.css'

const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

function HeartIcon({ filled }) {
  return (
    <svg
      className="movie-card__heart-icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <article className="movie-card">
      {movie.poster_path ? (
        <img
          className="movie-card__poster"
          src={`${IMG_BASE}${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div className="movie-card__poster movie-card__poster--placeholder">
          No Image
        </div>
      )}
      <div className="movie-card__body">
        <h2 className="movie-card__title">{movie.title}</h2>
        <button
          type="button"
          className={`movie-card__like${isFavorite ? ' movie-card__like--active' : ''}`}
          onClick={() => onToggleFavorite(movie)}
          aria-label={
            isFavorite ? `Remove ${movie.title} from favourites` : `Add ${movie.title} to favourites`
          }
          aria-pressed={isFavorite}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
    </article>
  )
}
