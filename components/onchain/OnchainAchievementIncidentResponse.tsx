'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementIncidentResponseProps {
  achievementId: bigint
}

export default function OnchainAchievementIncidentResponse({ achievementId }: OnchainAchievementIncidentResponseProps) {
  const { address, isConnected } = useAccount()
  const [planDetails, setPlanDetails] = useState('')
  const [responseOwner, setResponseOwner] = useState('')
  const [responseStatus, setResponseStatus] = useState<'planned' | 'in-progress' | 'completed'>('planned')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logResponse = async () => {
    if (!isConnected || !address || !planDetails.trim() || !responseOwner.trim()) return

    try {
      const payload = `INCIDENT_RESPONSE:plan:${planDetails}:owner:${responseOwner}:status:${responseStatus}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Incident response submission failed:', error)
    }
  }

  return (
    <AppCard title="🛠 Incident Response" subtitle="Track mitigation plans and owners" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Response Owner *</label>
          <input
            type="text"
            value={responseOwner}
            onChange={(e) => setResponseOwner(e.target.value)}
            placeholder="oncall@team"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Plan Details *</label>
          <textarea
            value={planDetails}
            onChange={(e) => setPlanDetails(e.target.value)}
            rows={3}
            placeholder="Failover steps, communication plan, rollback instructions"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={responseStatus}
            onChange={(e) => setResponseStatus(e.target.value as typeof responseStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={logResponse}
          disabled={isPending || isConfirming || !isConnected || !planDetails.trim() || !responseOwner.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Incident Response'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Incident response recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
