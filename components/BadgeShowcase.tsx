'use client'

import { useState } from 'react'

interface ShowcaseBadge {
  id: string
  name: string
  image: string
  collection: string
  rarity: string
  owner: string
}

export default function BadgeShowcase() {
  const [featuredBadges, setFeaturedBadges] = useState<ShowcaseBadge[]>([])
  const [selectedBadge, setSelectedBadge] = useState<ShowcaseBadge | null>(null)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🌟 Top Badges</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {featuredBadges.length === 0 ? (
          <div className="col-span-5 text-center text-gray-500 py-12">
            <p className="text-lg mb-2">No featured badges yet</p>
            <p className="text-sm">Rare badges will appear here</p>
          </div>
        ) : (
          featuredBadges.map((badge) => (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition cursor-pointer"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center relative">
                {badge.image ? (
                  <img src={badge.image} alt={badge.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-3xl">🏅</span>
                )}
                {badge.rarity === 'Legendary' && (
                  <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-yellow-500 text-white text-xs rounded">
                    ⭐
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-xs mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-500">{badge.collection}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
