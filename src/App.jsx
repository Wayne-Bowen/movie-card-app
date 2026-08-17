import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { useFavorites } from './hooks/useFavorites.js'
import Header from './components/Header.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Favourites from './pages/Favourites.jsx'
import Auth from './pages/Auth.jsx'

function AppRoutes() {
  const [searchQuery, setSearchQuery] = useState('')
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <ProtectedRoute>
                <Favourites
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App