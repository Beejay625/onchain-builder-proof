'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function OkrProofStreams() {
  const { address, isConnected } = useAccount()
  const [objective, setObjective] = useState('Ship attestation studio')
  const [keyResult, setKeyResult] = useState('3 circuits audited')
  const [confidence, setConfidence] = useState(0.7)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('okrProofStreams')) {
    return null
  }

  const handlePublish = async () => {
    if (!isConnected || !address || !objective.trim() || !keyResult.trim()) return

    try {
      const content = `OKR Proof
Objective: ${objective}
Key Result: ${keyResult}
Confidence: ${(confidence * 100).toFixed(0)}%`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('OKR proof publish failed:', error)
    }
  }

  return (
    <AppCard
      title="🎯 OKR Proof Streams"
      subtitle="Backlog-to-chain bridge for strategic objectives."
      accent="blue"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Objective</label>
          <input
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Key Result</label>
          <input
            type="text"
            value={keyResult}
            onChange={(e) => setKeyResult(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Confidence</label>
          <input
            type="number"
            step="0.05"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handlePublish}
          disabled={isPending || isConfirming || !isConnected || !objective.trim() || !keyResult.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Streaming...' : 'Stream Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ OKR proof streamed
          </div>
        )}
      </div>
    </AppCard>
  )
}

