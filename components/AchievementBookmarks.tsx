'use client'

import { useState } from 'react'

interface Bookmark {
  id: string
  achievementId: string
  title: string
  addedAt: number
}

export default function AchievementBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔖 Bookmarks</h2>
      
      <div className="space-y-3">
        {bookmarks.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No bookmarks saved</p>
        ) : (
          bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="font-semibold text-sm">{bookmark.title}</div>
                <div className="text-xs text-gray-500">
                  Bookmarked {new Date(bookmark.addedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => removeBookmark(bookmark.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
