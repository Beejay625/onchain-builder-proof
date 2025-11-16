'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementQuests() {
  const { address } = useAccount()
  const [questTitle, setQuestTitle] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createQuest = async () => {
    if (!address || !questTitle) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`QUEST: ${questTitle}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Achievement Quests</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Quest title"
          value={questTitle}
          onChange={(e) => setQuestTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createQuest}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Quest'}
        </button>
        {isSuccess && <p className="text-green-600">Quest created onchain!</p>}
      </div>
    </div>
  )
}

