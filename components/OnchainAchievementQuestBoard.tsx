'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementQuestBoard() {
  const { address } = useAccount()
  const [questTitle, setQuestTitle] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishQuest = async () => {
    if (!address || !questTitle) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`QUEST_BOARD: ${questTitle}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🗺️ Quest Board</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Quest title"
          value={questTitle}
          onChange={(e) => setQuestTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={publishQuest}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Quest'}
        </button>
        {isSuccess && <p className="text-green-600">Quest published onchain!</p>}
      </div>
    </div>
  )
}

