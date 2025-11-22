'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPredictiveBonusesProps {
  achievementId: bigint
}

export default function OnchainAchievementPredictiveBonuses({ achievementId }: OnchainAchievementPredictiveBonusesProps) {
  const { address } = useAccount()
  const [model, setModel] = useState('velocity-score-v2')
  const [bonusPool, setBonusPool] = useState('1500')
  const [confidence, setConfidence] = useState('0.82')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const streamBonus = () => {
    if (!address || !bonusPool.trim()) return

    const payload = `PREDICTIVE_BONUS|model:${model}|pool:${bonusPool}|confidence:${confidence}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white rounded-xl border border-blue-100 shadow p-6">
      <h3 className="text-xl font-bold mb-2">📊 Predictive Bonuses</h3>
      <p className="text-sm text-gray-600 mb-4">Publish model-driven reward unlocks tied to builder momentum.</p>

      <div className="space-y-3 mb-4">
        <input value={model} onChange={(e) => setModel(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Model id" />
        <input value={bonusPool} onChange={(e) => setBonusPool(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Bonus pool" />
        <input value={confidence} onChange={(e) => setConfidence(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Confidence" />
      </div>

      <button
        onClick={streamBonus}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Streaming...' : 'Publish predictive bonus'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Predictive bonus policy synced to chain.
        </div>
      )}
    </section>
  )
}
