'use client'

import { useState } from 'react'

interface Collection {
  id: string
  name: string
  badgeCount: number
  description: string
}

export default function BadgeCollectionManager() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)

  const createCollection = (name: string, description: string) => {
    const newCollection: Collection = {
      id: Date.now().toString(),
      name,
      badgeCount: 0,
      description,
    }
    setCollections([...collections, newCollection])
    setShowCreateModal(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📚 Badge Collections</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          + New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 py-8">
            No collections yet. Create your first collection!
          </div>
        ) : (
          collections.map((collection) => (
            <div
              key={collection.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
            >
              <h3 className="font-bold text-lg mb-2">{collection.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{collection.description}</p>
              <div className="text-xs text-gray-500">
                {collection.badgeCount} badges
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
