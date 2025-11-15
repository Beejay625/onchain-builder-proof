'use client'

import { useState } from 'react'

interface Draft {
  id: string
  title: string
  content: string
  createdAt: number
  lastModified: number
}

export default function AchievementDrafts() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null)

  const deleteDraft = (id: string) => {
    setDrafts(drafts.filter(d => d.id !== id))
    if (selectedDraft?.id === id) {
      setSelectedDraft(null)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📝 Drafts</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          + New Draft
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {drafts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No drafts saved</p>
          ) : (
            drafts.map((draft) => (
              <div
                key={draft.id}
                onClick={() => setSelectedDraft(draft)}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="font-semibold text-sm mb-1">{draft.title || 'Untitled'}</div>
                <div className="text-xs text-gray-500">
                  {new Date(draft.lastModified).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedDraft && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">{selectedDraft.title || 'Untitled'}</h3>
              <button
                onClick={() => deleteDraft(selectedDraft.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-700">{selectedDraft.content}</p>
          </div>
        )}
      </div>
    </div>
  )
}
