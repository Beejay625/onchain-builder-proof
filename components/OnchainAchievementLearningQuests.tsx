'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementLearningQuests() {
  const { address } = useAccount()
  const [questName, setQuestName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const startQuest = async () => {
    if (!address || !questName) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`LEARNING_QUEST: ${questName}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🗺️ Learning Quests</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Quest name"
          value={questName}
          onChange={(e) => setQuestName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={startQuest}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Starting...' : 'Start Quest'}
        </button>
        {isSuccess && <p className="text-green-600">Quest started onchain!</p>}
      </div>
    </div>
  )
}

