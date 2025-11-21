'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRiskAssessmentProps {
  achievementId: bigint
}

export default function OnchainAchievementRiskAssessment({ achievementId }: OnchainAchievementRiskAssessmentProps) {
  const { address } = useAccount()
  const [riskLevel, setRiskLevel] = useState('low')
  const [notes, setNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordRisk = () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, `RISK_ASSESSMENT: ${riskLevel}${notes ? ` | ${notes}` : ''}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚠️ Risk Assessment</h3>
      <select
        value={riskLevel}
        onChange={(e) => setRiskLevel(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add risk notes..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      <button
        onClick={recordRisk}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Risk Onchain'}
      </button>
      {isSuccess && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-500 rounded-lg text-sm text-orange-700">
          ✓ Risk assessment stored onchain
        </div>
      )}
    </div>
  )
}
