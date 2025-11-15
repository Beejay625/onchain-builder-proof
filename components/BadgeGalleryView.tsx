'use client'

import { useState } from 'react'

interface Badge {
  id: string
  name: string
  image: string
  collection: string
  rarity: string
}

export default function BadgeGalleryView() {
  const [badges, setBadges] = useState<Badge[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🖼️ Badge Gallery</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            List
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition">
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                {badge.image ? (
                  <img src={badge.image} alt={badge.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-3xl">🏅</span>
                )}
              </div>
              <h3 className="font-semibold text-xs mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-500">{badge.collection}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                {badge.image ? (
                  <img src={badge.image} alt={badge.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-2xl">🏅</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{badge.name}</h3>
                <p className="text-sm text-gray-500">{badge.collection}</p>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                {badge.rarity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
