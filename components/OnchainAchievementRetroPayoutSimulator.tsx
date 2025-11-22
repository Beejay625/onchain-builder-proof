'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRetroPayoutSimulatorProps {
  achievementId: bigint
}

export default function OnchainAchievementRetroPayoutSimulator({ achievementId }: OnchainAchievementRetroPayoutSimulatorProps) {
  const { address } = useAccount()
  const [modelVersion, setModelVersion] = useState('retro-v3')
  const [score, setScore] = useState('0.77')
  const [payoutEstimate, setPayoutEstimate] = useState('4200 USDC')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitSimulation = () => {
    if (!address || !modelVersion.trim()) return

    const payload = `RETRO_SIM|model:${modelVersion}|score:${score}|estimate:${payoutEstimate}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-yellow-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💸 Retro Payout Simulator</h3>
      <p className="text-sm text-gray-600 mb-4">Share predictive retro funding estimates with reviewers.</p>

      <div className="space-y-3 mb-4">
        <input value={modelVersion} onChange={(e) => setModelVersion(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Model version" />
        <input value={score} onChange={(e) => setScore(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Score" />
        <input value={payoutEstimate} onChange={(e) => setPayoutEstimate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Payout estimate" />
      </div>

      <button
        onClick={submitSimulation}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Simulating...' : 'Publish retro payout sim'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          ✓ Retro payout simulation pinned for reviewers.
        </div>
      )}
    </section>
  )
}
