'use client'

import { useState } from 'react'

interface Collaborator {
  address: string
  role: 'owner' | 'editor' | 'viewer'
  addedAt: number
}

interface AchievementCollaborationProps {
  achievementId: string
}

export default function AchievementCollaboration({ achievementId }: AchievementCollaborationProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [showAddModal, setShowAddModal] = useState(false)

  const addCollaborator = (address: string, role: string) => {
    const newCollaborator: Collaborator = {
      address,
      role: role as 'owner' | 'editor' | 'viewer',
      addedAt: Date.now(),
    }
    setCollaborators([...collaborators, newCollaborator])
    setShowAddModal(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">👥 Collaboration</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          + Add Collaborator
        </button>
      </div>

      <div className="space-y-3">
        {collaborators.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No collaborators yet</p>
        ) : (
          collaborators.map((collab, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-sm">{collab.address.slice(0, 10)}...</div>
                <div className="text-xs text-gray-500 capitalize">{collab.role}</div>
              </div>
              <button className="text-red-500 hover:text-red-700 text-sm">
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
