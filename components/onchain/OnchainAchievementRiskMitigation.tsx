'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRiskMitigationProps {
  achievementId: bigint
}

export default function OnchainAchievementRiskMitigation({ achievementId }: OnchainAchievementRiskMitigationProps) {
  const { address, isConnected } = useAccount()
  const [riskName, setRiskName] = useState('')
  const [mitigationPlan, setMitigationPlan] = useState('')
  const [riskStatus, setRiskStatus] = useState<'ready' | 'active' | 'retired'>('ready')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordMitigation = async () => {
    if (!isConnected || !address || !riskName.trim() || !mitigationPlan.trim()) return

    try {
      const payload = `RISK_MITIGATION:risk:${riskName}:plan:${mitigationPlan}:status:${riskStatus}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Risk mitigation submission failed:', error)
    }
  }

  return (
    <AppCard title="🛡 Risk Mitigation" subtitle="Document mitigation plans for key risks" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Name *</label>
          <input
            type="text"
            value={riskName}
            onChange={(e) => setRiskName(e.target.value)}
            placeholder="RPC outage, compliance delay, partner dependency"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mitigation Plan *</label>
          <textarea
            value={mitigationPlan}
            onChange={(e) => setMitigationPlan(e.target.value)}
            rows={3}
            placeholder="Describe actions, owners, and triggers"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={riskStatus}
            onChange={(e) => setRiskStatus(e.target.value as typeof riskStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="ready">Ready</option>
            <option value="active">Active</option>
            <option value="retired">Retired</option>
          </select>
        </div>
        <button
          onClick={recordMitigation}
          disabled={isPending || isConfirming || !isConnected || !riskName.trim() || !mitigationPlan.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Mitigation Plan'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Risk mitigation recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
