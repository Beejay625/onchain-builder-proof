'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

interface OnchainAchievementQRCodeProps {
  achievementId: bigint
}

export default function OnchainAchievementQRCode({ achievementId }: OnchainAchievementQRCodeProps) {
  const { address } = useAccount()
  const [showQR, setShowQR] = useState(false)
  
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/achievement/${achievementId}` 
    : ''

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📱 QR Code</h3>
      
      <button
        onClick={() => setShowQR(!showQR)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        {showQR ? 'Hide QR Code' : 'Generate QR Code'}
      </button>

      {showQR && shareUrl && (
        <div className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg border-2 border-gray-300 mb-4">
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-400">
              QR Code Placeholder
            </div>
          </div>
          <p className="text-xs text-gray-600 break-all text-center">{shareUrl}</p>
        </div>
      )}
    </div>
  )
}

