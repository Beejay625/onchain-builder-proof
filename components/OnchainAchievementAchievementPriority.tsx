'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAchievementPriorityProps {
  achievementId: bigint
}

export default function OnchainAchievementAchievementPriority({ achievementId }: OnchainAchievementAchievementPriorityProps) {
  const { address } = useAccount()
  const [priority, setPriority] = useState('medium')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setPriorityLevel = async () => {
    if (!address) return
    
    const priorityData = `ACHIEVEMENT_PRIORITY: ${priority}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, priorityData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎯 Achievement Priority</h3>
      
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      
      <button
        onClick={setPriorityLevel}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting...' : 'Set Priority Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Priority set onchain
        </div>
      )}
    </div>
  )
}
