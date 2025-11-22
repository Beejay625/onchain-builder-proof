'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAIReviewInsightsProps {
  achievementId: bigint
}

export default function OnchainAchievementAIReviewInsights({ achievementId }: OnchainAchievementAIReviewInsightsProps) {
  const { address } = useAccount()
  const [model, setModel] = useState('gpt-audit-v1')
  const [finding, setFinding] = useState('No critical issues detected')
  const [riskScore, setRiskScore] = useState('0.18')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const logInsight = () => {
    if (!address || !finding.trim()) return

    const payload = `AI_REVIEW|model:${model}|finding:${finding}|risk:${riskScore}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🤖 AI Review Insights</h3>
      <p className="text-sm text-gray-600 mb-4">Archive AI summarizations directly in the onchain record.</p>

      <div className="space-y-3 mb-4">
        <input value={model} onChange={(e) => setModel(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Model" />
        <textarea value={finding} onChange={(e) => setFinding(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Finding" />
        <input value={riskScore} onChange={(e) => setRiskScore(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Risk score" />
      </div>

      <button
        onClick={logInsight}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing insight...' : 'Publish AI insight'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ AI review stored for future audits.
        </div>
      )}
    </section>
  )
}
