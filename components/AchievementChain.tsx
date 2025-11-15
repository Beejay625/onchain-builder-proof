'use client'

import { useState } from 'react'

interface ChainLink {
  id: string
  achievementId: string
  title: string
  connectedTo: string[]
}

export default function AchievementChain() {
  const [chainLinks, setChainLinks] = useState<ChainLink[]>([])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">🔗 Achievement Chain</h2>
      <div className="space-y-4">
        {chainLinks.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No chain connections</p>
        ) : (
          chainLinks.map((link) => (
            <div key={link.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="font-semibold mb-2">{link.title}</div>
              <div className="text-sm text-gray-600">
                Connected to {link.connectedTo.length} achievement(s)
              </div>
              {link.connectedTo.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {link.connectedTo.map((connectedId) => (
                    <span key={connectedId} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      #{connectedId}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
