'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementPriorityProps {
  achievementId: bigint
}

export default function OnchainAchievementPriority({ achievementId }: OnchainAchievementPriorityProps) {
  const { address, isConnected } = useAccount()
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const setPriorityLevel = async () => {
    if (!isConnected || !address) return

    try {
      const priorityData = `PRIORITY:${priority}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, priorityData],
      })
    } catch (error) {
      console.error('Priority setting failed:', error)
    }
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
  }

  return (
    <AppCard title="📌 Achievement Priority" subtitle="Set priority level for achievement" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as typeof priority)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className={`p-3 rounded-lg ${priorityColors[priority]}`}>
          <p className="text-sm font-semibold">Current Priority: {priority.toUpperCase()}</p>
        </div>
        <button
          onClick={setPriorityLevel}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Priority'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Priority set to {priority} onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

