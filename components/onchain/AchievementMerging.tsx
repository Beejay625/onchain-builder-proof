'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementMergingProps {
  achievementIds: bigint[]
}

export default function AchievementMerging({ achievementIds }: AchievementMergingProps) {
  const { address, isConnected } = useAccount()
  const [mergeDescription, setMergeDescription] = useState('')
  const [conflictResolution, setConflictResolution] = useState<'merge' | 'prefer-first' | 'prefer-latest'>('merge')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementMerging')) {
    return null
  }

  const handleMerge = async () => {
    if (!isConnected || !address || achievementIds.length < 2) return

    try {
      const mergeContent = `Merged achievements: ${achievementIds.map((id) => `#${id.toString()}`).join(', ')}\n\nResolution: ${conflictResolution}\n\n${mergeDescription}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [mergeContent],
      })
    } catch (error) {
      console.error('Merge failed:', error)
    }
  }

  return (
    <AppCard title="🔀 Merge Achievements" subtitle="Combine multiple achievements with conflict resolution" accent="purple">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Merging {achievementIds.length} achievements: {achievementIds.map((id) => `#${id.toString()}`).join(', ')}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Conflict Resolution</label>
          <select
            value={conflictResolution}
            onChange={(e) => setConflictResolution(e.target.value as 'merge' | 'prefer-first' | 'prefer-latest')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="merge">Merge All Content</option>
            <option value="prefer-first">Prefer First Achievement</option>
            <option value="prefer-latest">Prefer Latest Achievement</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Merge Description</label>
          <textarea
            value={mergeDescription}
            onChange={(e) => setMergeDescription(e.target.value)}
            placeholder="Describe the merged achievement..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleMerge}
          disabled={isPending || isConfirming || !isConnected || achievementIds.length < 2}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Merging...' : 'Merge Achievements'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Achievements merged onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}


