'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementPriceFeedsProps {
  achievementId: bigint
}

export default function AchievementPriceFeeds({ achievementId }: AchievementPriceFeedsProps) {
  const { address, isConnected } = useAccount()
  const [tokenPair, setTokenPair] = useState('ETH/USD')
  const [price, setPrice] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementPriceFeeds')) {
    return null
  }

  const handleUpdatePrice = async () => {
    if (!isConnected || !address || !price.trim()) return

    try {
      const content = `Price Feed Update\nAchievement: #${achievementId.toString()}\nPair: ${tokenPair}\nPrice: ${price}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Price feed update failed:', error)
    }
  }

  return (
    <AppCard title="📈 Achievement Price Feeds" subtitle="Record price feed updates from oracle networks" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Pair</label>
          <input
            type="text"
            value={tokenPair}
            onChange={(e) => setTokenPair(e.target.value)}
            placeholder="ETH/USD"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="2500.00"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        {price && (
          <div className="grid grid-cols-2 gap-4">
            <StatBadge label="Pair" value={tokenPair} accent="blue" />
            <StatBadge label="Price" value={price} accent="green" />
          </div>
        )}
        <button
          onClick={handleUpdatePrice}
          disabled={isPending || isConfirming || !isConnected || !price.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Updating...' : 'Update Price Feed'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Price feed updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

