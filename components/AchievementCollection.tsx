'use client'

import { useState } from 'react'

interface Collection {
  id: string
  name: string
  description: string
  achievementIds: string[]
  createdAt: number
}

export default function AchievementCollection() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  const [collectionDesc, setCollectionDesc] = useState('')

  const createCollection = () => {
    if (!collectionName.trim()) return

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: collectionName,
      description: collectionDesc,
      achievementIds: [],
      createdAt: Date.now(),
    }

    setCollections([...collections, newCollection])
    setCollectionName('')
    setCollectionDesc('')
    setShowCreateModal(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📚 Achievement Collections</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          + New Collection
        </button>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Create Collection</h3>
            <input
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="Collection name"
              className="w-full p-2 border border-gray-300 rounded-lg mb-3"
            />
            <textarea
              value={collectionDesc}
              onChange={(e) => setCollectionDesc(e.target.value)}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded-lg mb-3"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={createCollection}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
                {collection.achievementIds.length} achievements
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
