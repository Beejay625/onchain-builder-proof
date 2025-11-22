'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { parseEther } from 'viem'

interface AchievementTimeBasedRewardsProps {
  achievementId: bigint
}

export default function AchievementTimeBasedRewards({ achievementId }: AchievementTimeBasedRewardsProps) {
  const { address, isConnected } = useAccount()
  const [holdingDuration, setHoldingDuration] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementTimeBasedRewards')) {
    return null
  }

  const handleSetupRewards = async () => {
    if (!isConnected || !address || !holdingDuration.trim() || !rewardAmount.trim()) return

    try {
      const rewardContent = `TIMEREWARD:${holdingDuration}:${rewardAmount}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, rewardContent],
      })
    } catch (error) {
      console.error('Time-based rewards setup failed:', error)
    }
  }

  return (
    <AppCard title="⏰ Time-Based Rewards" subtitle="Rewards based on holding duration" accent="amber">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Holding Duration (days)</label>
          <input
            type="number"
            value={holdingDuration}
            onChange={(e) => setHoldingDuration(e.target.value)}
            placeholder="e.g., 30"
            min="1"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reward Amount (ETH)</label>
          <input
            type="number"
            value={rewardAmount}
            onChange={(e) => setRewardAmount(e.target.value)}
            placeholder="e.g., 0.1"
            step="0.001"
            min="0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetupRewards}
          disabled={isPending || isConfirming || !isConnected || !holdingDuration.trim() || !rewardAmount.trim()}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Time-Based Rewards'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
            ✅ Time-based rewards configured: {rewardAmount} ETH after {holdingDuration} days
          </div>
        )}
      </div>
    </AppCard>
  )
}

