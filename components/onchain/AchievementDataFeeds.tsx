'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementDataFeedsProps {
  achievementId: bigint
}

export default function AchievementDataFeeds({ achievementId }: AchievementDataFeedsProps) {
  const { address, isConnected } = useAccount()
  const [feedType, setFeedType] = useState<'price' | 'volume' | 'liquidity' | 'other'>('price')
  const [feedData, setFeedData] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementDataFeeds')) {
    return null
  }

  const handleTrackFeed = async () => {
    if (!isConnected || !address || !feedData.trim()) return

    try {
      const content = `Data Feed\nAchievement: #${achievementId.toString()}\nType: ${feedType}\nData: ${feedData}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Data feed tracking failed:', error)
    }
  }

  return (
    <AppCard title="📡 Achievement Data Feeds" subtitle="Track data feeds operations and verifications" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Feed Type</label>
          <select
            value={feedType}
            onChange={(e) => setFeedType(e.target.value as 'price' | 'volume' | 'liquidity' | 'other')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="price">Price</option>
            <option value="volume">Volume</option>
            <option value="liquidity">Liquidity</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Feed Data</label>
          <textarea
            value={feedData}
            onChange={(e) => setFeedData(e.target.value)}
            placeholder="Enter feed data..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleTrackFeed}
          disabled={isPending || isConfirming || !isConnected || !feedData.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Tracking...' : 'Track Data Feed'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Data feed tracked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

