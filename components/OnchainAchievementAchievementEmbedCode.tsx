'use client'

import { useState } from 'react'

export default function OnchainAchievementAchievementEmbedCode() {
  const [embedCode] = useState('<iframe src="..."></iframe>')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Embed Code</h2>
      <div className="space-y-4">
        <textarea
          value={embedCode}
          readOnly
          className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
          rows={3}
        />
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Copy Embed Code
        </button>
      </div>
    </div>
  )
}

