'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

interface OnchainAchievementEmbedProps {
  achievementId: bigint
}

export default function OnchainAchievementEmbed({ achievementId }: OnchainAchievementEmbedProps) {
  const { address } = useAccount()
  const [embedCode, setEmbedCode] = useState('')
  
  const generateEmbed = () => {
    const embed = `<iframe src="${typeof window !== 'undefined' ? window.location.origin : ''}/embed/${achievementId}" width="600" height="400" frameborder="0"></iframe>`
    setEmbedCode(embed)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📄 Embed Code</h3>
      
      <button
        onClick={generateEmbed}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-4"
      >
        Generate Embed Code
      </button>

      {embedCode && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Embed Code:</label>
          <textarea
            value={embedCode}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg font-mono text-xs"
            rows={4}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(embedCode)
              alert('Copied to clipboard!')
            }}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Copy Embed Code
          </button>
        </div>
      )}
    </div>
  )
}

