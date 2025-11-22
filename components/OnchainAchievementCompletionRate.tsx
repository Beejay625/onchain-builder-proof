'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCompletionRateProps {
  achievementId: bigint
}

export default function OnchainAchievementCompletionRate({ achievementId }: OnchainAchievementCompletionRateProps) {
  const { address } = useAccount()
  const [completionRate, setCompletionRate] = useState('')
  const [completedTasks, setCompletedTasks] = useState('')
  const [totalTasks, setTotalTasks] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateCompletionRate = async () => {
    if (!address || !completionRate.trim()) return
    
    const completionData = `COMPLETION_RATE:${completionRate.trim()}:completed:${completedTasks.trim() || '0'}:total:${totalTasks.trim() || '0'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, completionData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Achievement Completion Rate</h3>
      
      <input
        type="number"
        step="0.01"
        value={completionRate}
        onChange={(e) => setCompletionRate(e.target.value)}
        placeholder="Completion rate (0-100)"
        min="0"
        max="100"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={completedTasks}
        onChange={(e) => setCompletedTasks(e.target.value)}
        placeholder="Completed tasks (optional)"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={totalTasks}
        onChange={(e) => setTotalTasks(e.target.value)}
        placeholder="Total tasks (optional)"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={updateCompletionRate}
        disabled={isPending || isConfirming || !completionRate.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Completion Rate Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Completion rate updated onchain
        </div>
      )}
    </div>
  )
}
