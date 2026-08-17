import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuth } from '../context/AuthContext.jsx'

export function useFavorites() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (!user) {
      setFavorites([])
      return
    }

    const favoritesRef = doc(db, 'users', user.uid, 'favorites', 'list')

    const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
      if (snapshot.exists()) {
        setFavorites(snapshot.data().movies || [])
      } else {
        setFavorites([])
      }
    })

    return unsubscribe
  }, [user])

  async function toggleFavorite(movie) {
    if (!user) {
      navigate('/auth')
      return
    }

    const favoritesRef = doc(db, 'users', user.uid, 'favorites', 'list')
    const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id)

    if (isAlreadyFavorite) {
      const updated = favorites.filter((fav) => fav.id !== movie.id)
      await setDoc(favoritesRef, { movies: updated })
    } else {
      const updated = [...favorites, movie]
      await setDoc(favoritesRef, { movies: updated })
    }
  }

  return { favorites, toggleFavorite }
}
