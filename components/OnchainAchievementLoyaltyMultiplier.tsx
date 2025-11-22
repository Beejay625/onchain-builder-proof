'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLoyaltyMultiplierProps {
  achievementId: bigint
}

export default function OnchainAchievementLoyaltyMultiplier({ achievementId }: OnchainAchievementLoyaltyMultiplierProps) {
  const { address } = useAccount()
  const [streakWeeks, setStreakWeeks] = useState('6')
  const [multiplier, setMultiplier] = useState('1.35x')
  const [rewardType, setRewardType] = useState('retro funding')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordMultiplier = () => {
    if (!address || !multiplier.trim()) return

    const payload = `LOYALTY_MULTIPLIER|streak:${streakWeeks}|multiplier:${multiplier}|reward:${rewardType}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white rounded-xl border border-orange-100 shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔥 Loyalty Multipliers</h3>
      <p className="text-sm text-gray-600 mb-4">Capture streak boosts that influence allocation formulas.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input value={streakWeeks} onChange={(e) => setStreakWeeks(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Streak weeks" />
        <input value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Multiplier" />
        <input value={rewardType} onChange={(e) => setRewardType(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Reward type" />
      </div>

      <button
        onClick={recordMultiplier}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record loyalty multiplier'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
          ✓ Loyalty boost tied to onchain record.
        </div>
      )}
    </section>
  )
}
