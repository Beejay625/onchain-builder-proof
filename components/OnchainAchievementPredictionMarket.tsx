'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPredictionMarketProps {
  achievementId: bigint
}

export default function OnchainAchievementPredictionMarket({ achievementId }: OnchainAchievementPredictionMarketProps) {
  const { address } = useAccount()
  const [marketId, setMarketId] = useState('market-123')
  const [outcome, setOutcome] = useState('achieved')
  const [odds, setOdds] = useState('0.75')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordMarket = () => {
    if (!address || !marketId.trim()) return

    const payload = `PREDICTION_MARKET|id:${marketId}|outcome:${outcome}|odds:${odds}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔮 Prediction Market</h3>
      <p className="text-sm text-gray-600 mb-4">Link prediction market outcomes to achievement completion.</p>

      <div className="space-y-3 mb-4">
        <input value={marketId} onChange={(e) => setMarketId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Market ID" />
        <input value={outcome} onChange={(e) => setOutcome(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Outcome" />
        <input value={odds} onChange={(e) => setOdds(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Odds" />
      </div>

      <button
        onClick={recordMarket}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record prediction market'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ Prediction market outcome stored.
        </div>
      )}
    </section>
  )
}
