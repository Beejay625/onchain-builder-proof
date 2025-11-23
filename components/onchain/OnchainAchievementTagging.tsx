'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementTaggingProps {
  achievementId: bigint
}

export default function OnchainAchievementTagging({ achievementId }: OnchainAchievementTaggingProps) {
  const { address, isConnected } = useAccount()
  const [tags, setTags] = useState('')
  const [tagCategory, setTagCategory] = useState<'skill' | 'project' | 'milestone' | 'custom'>('custom')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const addTags = async () => {
    if (!isConnected || !address || !tags.trim()) return

    try {
      const tagData = `TAGS:category:${tagCategory}:tags:${tags}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, tagData],
      })
    } catch (error) {
      console.error('Tagging failed:', error)
    }
  }

  return (
    <AppCard title="🏷️ Achievement Tagging" subtitle="Add tags to organize achievements" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tag Category</label>
          <select
            value={tagCategory}
            onChange={(e) => setTagCategory(e.target.value as typeof tagCategory)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="skill">Skill</option>
            <option value="project">Project</option>
            <option value="milestone">Milestone</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags *</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Comma-separated: tag1, tag2, tag3"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={addTags}
          disabled={isPending || isConfirming || !isConnected || !tags.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Tagging...' : 'Add Tags'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Tags added onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

