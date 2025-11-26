'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementImpactMeasurement() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [impact, setImpact] = useState('')
  const [metrics, setMetrics] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordImpact = async () => {
    if (!address || !postId || !impact || !metrics) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `IMPACT:${impact}:${metrics}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Impact Measurement</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Impact description"
          value={impact}
          onChange={(e) => setImpact(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Metrics (e.g., users reached, revenue)"
          value={metrics}
          onChange={(e) => setMetrics(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={recordImpact}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Impact'}
        </button>
        {isSuccess && <p className="text-green-600">Impact recorded onchain!</p>}
      </div>
    </div>
  )
}





