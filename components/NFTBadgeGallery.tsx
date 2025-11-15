'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { truncateAddress } from '@/lib/utils'

interface NFTBadge {
  tokenId: string
  contractAddress: string
  name: string
  image: string
  description: string
  collection: string
}

export default function NFTBadgeGallery() {
  const { address } = useAccount()
  const [badges, setBadges] = useState<NFTBadge[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (address) {
      loadNFTBadges()
    }
  }, [address])

  const loadNFTBadges = async () => {
    setIsLoading(true)
    try {
      // Fetch NFT badges from wallet
      // This would integrate with an NFT indexer API
    } catch (error) {
      console.error('Failed to load NFT badges:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🏅 NFT Badge Gallery</h2>
        <button
          onClick={loadNFTBadges}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading badges from wallet...</p>
        </div>
      ) : badges.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No NFT badges found in your wallet</p>
          <p className="text-sm text-gray-500">Connect your wallet to discover badges</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.tokenId}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition cursor-pointer"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                {badge.image ? (
                  <img src={badge.image} alt={badge.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-4xl">🏅</span>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
              <p className="text-xs text-gray-500">{badge.collection}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

