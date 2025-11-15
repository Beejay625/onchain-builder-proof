'use client'

import { useState } from 'react'

interface Group {
  id: string
  name: string
  description: string
  members: number
  achievements: number
}

export default function AchievementGroups() {
  const [groups, setGroups] = useState<Group[]>([])

  const joinGroup = (groupId: string) => {
    // Join achievement group
    console.log('Joining group:', groupId)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">👥 Groups</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.length === 0 ? (
          <div className="col-span-2 text-center text-gray-500 py-8">
            No groups available
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
              <h3 className="font-bold text-lg mb-2">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{group.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {group.members} members • {group.achievements} achievements
                </div>
                <button
                  onClick={() => joinGroup(group.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  Join
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
