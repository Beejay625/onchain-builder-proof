'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementComplianceTaskProps {
  achievementId: bigint
}

export default function OnchainAchievementComplianceTask({ achievementId }: OnchainAchievementComplianceTaskProps) {
  const { address, isConnected } = useAccount()
  const [taskName, setTaskName] = useState('')
  const [taskOwner, setTaskOwner] = useState('')
  const [taskStatus, setTaskStatus] = useState<'open' | 'in-progress' | 'completed'>('open')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logTask = async () => {
    if (!isConnected || !address || !taskName.trim() || !taskOwner.trim()) return

    try {
      const payload = `COMPLIANCE_TASK:task:${taskName}:owner:${taskOwner}:status:${taskStatus}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Compliance task logging failed:', error)
    }
  }

  return (
    <AppCard title="📋 Compliance Task" subtitle="Track regulatory or KYC obligations" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Task Name *</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="KYC refresh, SOC2 evidence"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Owner *</label>
          <input
            type="text"
            value={taskOwner}
            onChange={(e) => setTaskOwner(e.target.value)}
            placeholder="compliance@team"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value as typeof taskStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={logTask}
          disabled={isPending || isConfirming || !isConnected || !taskName.trim() || !taskOwner.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Compliance Task'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Compliance task recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
