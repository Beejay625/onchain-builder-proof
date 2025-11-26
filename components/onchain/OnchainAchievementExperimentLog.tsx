'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementExperimentLogProps {
  achievementId: bigint
}

export default function OnchainAchievementExperimentLog({ achievementId }: OnchainAchievementExperimentLogProps) {
  const { address, isConnected } = useAccount()
  const [experimentHypothesis, setExperimentHypothesis] = useState('')
  const [experimentResult, setExperimentResult] = useState('')
  const [experimentStatus, setExperimentStatus] = useState<'validated' | 'invalidated' | 'in-progress'>('in-progress')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordExperiment = async () => {
    if (!isConnected || !address || !experimentHypothesis.trim() || !experimentResult.trim()) return

    try {
      const payload = `EXPERIMENT_LOG:hypothesis:${experimentHypothesis}:result:${experimentResult}:status:${experimentStatus}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Experiment log submission failed:', error)
    }
  }

  return (
    <AppCard title="🧪 Experiment Log" subtitle="Document experiments, outcomes, and status" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hypothesis *</label>
          <textarea
            value={experimentHypothesis}
            onChange={(e) => setExperimentHypothesis(e.target.value)}
            rows={3}
            placeholder="If we ship x, users will..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Result *</label>
          <textarea
            value={experimentResult}
            onChange={(e) => setExperimentResult(e.target.value)}
            rows={3}
            placeholder="Outcome, metrics moved, learnings"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={experimentStatus}
            onChange={(e) => setExperimentStatus(e.target.value as typeof experimentStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="validated">Validated</option>
            <option value="invalidated">Invalidated</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>
        <button
          onClick={recordExperiment}
          disabled={isPending || isConfirming || !isConnected || !experimentHypothesis.trim() || !experimentResult.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Experiment'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Experiment logged onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
