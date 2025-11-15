'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatEthAmount } from 'viem'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface AchievementMarketplaceProps {
  achievementId: bigint
}

export default function AchievementMarketplace({ achievementId }: AchievementMarketplaceProps) {
  const [price, setPrice] = useState('0.1')
  const [isListing, setIsListing] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const listAchievement = async () => {
    setIsListing(true)
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'listAchievement',
        args: [achievementId, parseUnits(price, 18)],
      })
    } catch (error) {
      console.error('Listing error:', error)
      setIsListing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏪 List Achievement</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Price (ETH)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            step="0.01"
            min="0.01"
          />
        </div>
        <button
          onClick={listAchievement}
          disabled={isPending || isListing}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isListing ? 'Listing...' : `List for ${formatEthAmount(parseUnits(price, 18))}`}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Achievement listed on marketplace
          </div>
        )}
      </div>
    </div>
  )
}
