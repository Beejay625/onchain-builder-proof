'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

interface DiscoveredBadge {
  contractAddress: string
  tokenId: string
  name: string
  image: string
  collection: string
  chain: string
}

export default function BadgeDiscovery() {
  const { address } = useAccount()
  const [discoveredBadges, setDiscoveredBadges] = useState<DiscoveredBadge[]>([])
  const [isScanning, setIsScanning] = useState(false)

  const scanForBadges = async () => {
    if (!address) return

    setIsScanning(true)
    try {
      // Scan multiple chains for NFT badges
      // This would integrate with NFT indexers across chains
      setTimeout(() => {
        setIsScanning(false)
      }, 3000)
    } catch (error) {
      console.error('Discovery error:', error)
      setIsScanning(false)
    }
  }

  useEffect(() => {
    if (address) {
      scanForBadges()
    }
  }, [address])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🔍 Badge Discovery</h2>
        <button
          onClick={scanForBadges}
          disabled={isScanning}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-sm"
        >
          {isScanning ? 'Scanning...' : 'Scan Wallets'}
        </button>
      </div>

      {isScanning ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Scanning multiple chains for badges...</p>
        </div>
      ) : discoveredBadges.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-2">No badges discovered</p>
          <p className="text-sm text-gray-500">Connect wallet to scan for badges</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {discoveredBadges.map((badge) => (
            <div
              key={`${badge.contractAddress}-${badge.tokenId}`}
              className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                {badge.image ? (
                  <img src={badge.image} alt={badge.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-3xl">🏅</span>
                )}
              </div>
              <h3 className="font-semibold text-xs mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-500">{badge.collection}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                {badge.chain}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
