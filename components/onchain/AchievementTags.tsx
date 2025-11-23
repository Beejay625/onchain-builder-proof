'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementTagsProps {
  achievementId: bigint
}

export default function AchievementTags({ achievementId }: AchievementTagsProps) {
  const { address, isConnected } = useAccount()
  const [tags, setTags] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementTags')) {
    return null
  }

  const handleSetTags = async () => {
    if (!isConnected || !address || !tags.trim()) return

    try {
      const content = `Tag Assignment\nAchievement: #${achievementId.toString()}\nTags: ${tags}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Tag assignment failed:', error)
    }
  }

  return (
    <AppCard title="🏷️ Achievement Tags" subtitle="Add tags to achievements for better organization" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, typescript, web3"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetTags}
          disabled={isPending || isConfirming || !isConnected || !tags.trim()}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Tags'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Tags assigned onchain
          </div>
        )}
        <p className="text-xs text-gray-500">
          Tags help organize and discover achievements more easily.
        </p>
      </div>
    </AppCard>
  )
}

