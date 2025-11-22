'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementExperimentTrackingProps {
  achievementId: bigint
}

export default function OnchainAchievementExperimentTracking({ achievementId }: OnchainAchievementExperimentTrackingProps) {
  const { address } = useAccount()
  const [experimentName, setExperimentName] = useState('')
  const [experimentHypothesis, setExperimentHypothesis] = useState('')
  const [experimentStatus, setExperimentStatus] = useState('running')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const trackExperiment = async () => {
    if (!address || !experimentName.trim()) return
    
    const experimentData = `EXPERIMENT:name:${experimentName.trim()}:hypothesis:${experimentHypothesis.trim() || 'none'}:status:${experimentStatus}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, experimentData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🧪 Experiment Tracking</h3>
      
      <input
        type="text"
        value={experimentName}
        onChange={(e) => setExperimentName(e.target.value)}
        placeholder="Experiment name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={experimentHypothesis}
        onChange={(e) => setExperimentHypothesis(e.target.value)}
        placeholder="Hypothesis (optional)"
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <select
        value={experimentStatus}
        onChange={(e) => setExperimentStatus(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="running">Running</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
        <option value="paused">Paused</option>
      </select>
      
      <button
        onClick={trackExperiment}
        disabled={isPending || isConfirming || !experimentName.trim()}
        className="w-full px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Tracking...' : 'Track Experiment Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Experiment tracked onchain
        </div>
      )}
    </div>
  )
}
