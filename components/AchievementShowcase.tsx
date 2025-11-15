'use client'

import { useState } from 'react'

interface ShowcaseItem {
  id: string
  title: string
  description: string
  image?: string
  featured: boolean
}

export default function AchievementShowcase() {
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([])
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">⭐ Featured Achievements</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {showcaseItems.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 py-12">
            <p className="text-lg mb-2">No featured achievements yet</p>
            <p className="text-sm">Top achievements will appear here</p>
          </div>
        ) : (
          showcaseItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition cursor-pointer"
            >
              {item.image && (
                <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              {item.featured && (
                <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                  ⭐ Featured
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
