import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Favourites from './pages/Favourites.jsx'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState([])

  function handleToggleFavorite(movie) {
    setFavorites((currentFavorites) => {
      const isAlreadyFavorite = currentFavorites.some(
        (favorite) => favorite.id === movie.id,
      )

      if (isAlreadyFavorite) {
        return currentFavorites.filter((favorite) => favorite.id !== movie.id)
      }

      return [...currentFavorites, movie]
    })
  }

  return (
    <BrowserRouter>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
