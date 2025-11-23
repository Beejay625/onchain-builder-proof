'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementQuests() {
  const { address, isConnected } = useAccount()
  const [questTitle, setQuestTitle] = useState('')
  const [questDescription, setQuestDescription] = useState('')
  const [questReward, setQuestReward] = useState('')
  const [questDeadline, setQuestDeadline] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainQuests')) {
    return null
  }

  const handleCreateQuest = async () => {
    if (!isConnected || !address || !questTitle.trim() || !questDescription.trim()) return

    try {
      const content = `Achievement Quest\nTitle: ${questTitle}\nDescription: ${questDescription}${questReward ? `\nReward: ${questReward}` : ''}${questDeadline ? `\nDeadline: ${questDeadline}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Quest creation failed:', error)
    }
  }

  return (
    <AppCard title="🎯 Achievement Quests" subtitle="Create and complete achievement quests" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quest Title</label>
          <input
            type="text"
            value={questTitle}
            onChange={(e) => setQuestTitle(e.target.value)}
            placeholder="Quest name..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={questDescription}
            onChange={(e) => setQuestDescription(e.target.value)}
            placeholder="What needs to be accomplished?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reward (optional)</label>
          <input
            type="text"
            value={questReward}
            onChange={(e) => setQuestReward(e.target.value)}
            placeholder="e.g., 100 tokens, 0.1 ETH"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (optional)</label>
          <input
            type="date"
            value={questDeadline}
            onChange={(e) => setQuestDeadline(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateQuest}
          disabled={isPending || isConfirming || !isConnected || !questTitle.trim() || !questDescription.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Quest'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Quest created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

