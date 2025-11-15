'use client'

import { useState } from 'react'

interface RarityData {
  totalSupply: number
  holders: number
  floorPrice: number
}

interface BadgeRarityProps {
  contractAddress: string
  tokenId: string
}

export default function BadgeRarity({ contractAddress, tokenId }: BadgeRarityProps) {
  const [rarity, setRarity] = useState<RarityData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateRarity = async () => {
    setIsLoading(true)
    try {
      // Calculate rarity based on supply and holders
      // This would fetch from an NFT indexer
      const mockRarity: RarityData = {
        totalSupply: 1000,
        holders: 750,
        floorPrice: 0.01,
      }
      setRarity(mockRarity)
    } catch (error) {
      console.error('Failed to calculate rarity:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRarityLevel = () => {
    if (!rarity) return 'Unknown'
    const rarityScore = (rarity.holders / rarity.totalSupply) * 100
    if (rarityScore < 10) return 'Legendary'
    if (rarityScore < 25) return 'Epic'
    if (rarityScore < 50) return 'Rare'
    return 'Common'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💎 Badge Rarity</h3>
      <button
        onClick={calculateRarity}
        disabled={isLoading}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 mb-4"
      >
        {isLoading ? 'Calculating...' : 'Calculate Rarity'}
      </button>

      {rarity && (
        <div className="space-y-3">
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-sm text-gray-600">Rarity Level</div>
            <div className="text-2xl font-bold text-purple-600">{getRarityLevel()}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600">Total Supply</div>
              <div className="text-lg font-semibold">{rarity.totalSupply}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600">Holders</div>
              <div className="text-lg font-semibold">{rarity.holders}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
