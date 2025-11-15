'use client'

import { useState } from 'react'

interface ArchivedItem {
  id: string
  type: 'achievement' | 'badge'
  title: string
  archivedAt: number
}

export default function OnchainArchive() {
  const [archivedItems, setArchivedItems] = useState<ArchivedItem[]>([])

  const restoreItem = (id: string) => {
    setArchivedItems(archivedItems.filter(item => item.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Archive</h2>
      
      <div className="space-y-3">
        {archivedItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No archived items</p>
        ) : (
          archivedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-semibold text-sm">{item.title}</div>
                <div className="text-xs text-gray-500">
                  Archived {new Date(item.archivedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => restoreItem(item.id)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Restore
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
