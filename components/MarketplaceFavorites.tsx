'use client'

import { useState } from 'react'

interface Favorite {
  id: string
  badgeName: string
  image: string
  price: number
  addedAt: number
}

export default function MarketplaceFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(fav => fav.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">❤️ Favorites</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favorites.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500 py-8">
            No favorites yet
          </div>
        ) : (
          favorites.map((favorite) => (
            <div key={favorite.id} className="relative border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition">
              <button
                onClick={() => removeFavorite(favorite.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                {favorite.image ? (
                  <img src={favorite.image} alt={favorite.badgeName} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-3xl">🏅</span>
                )}
              </div>
              <h3 className="font-semibold text-xs mb-1">{favorite.badgeName}</h3>
              <div className="text-xs font-bold text-blue-600">{favorite.price} ETH</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
