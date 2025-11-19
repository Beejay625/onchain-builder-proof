'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementQuestsProps {
  achievementId: bigint
}

export default function OnchainAchievementQuests({ achievementId }: OnchainAchievementQuestsProps) {
  const { address } = useAccount()
  const [questTitle, setQuestTitle] = useState('')
  const [questDescription, setQuestDescription] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createQuest = async () => {
    if (!address || !questTitle.trim()) return
    
    const questData = `QUEST: ${questTitle}${questDescription ? ` | ${questDescription}` : ''}${rewardAmount ? ` | reward: ${rewardAmount}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, questData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎯 Quest Creation</h3>
      
      <input
        type="text"
        value={questTitle}
        onChange={(e) => setQuestTitle(e.target.value)}
        placeholder="Quest title"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={questDescription}
        onChange={(e) => setQuestDescription(e.target.value)}
        placeholder="Quest description"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={4}
      />
      
      <input
        type="number"
        value={rewardAmount}
        onChange={(e) => setRewardAmount(e.target.value)}
        placeholder="Reward amount (optional)"
        step="0.01"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={createQuest}
        disabled={isPending || isConfirming || !questTitle.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Quest Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Quest created onchain
        </div>
      )}
    </div>
  )
}
