'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRewardDistributionProps {
  achievementId: bigint
}

export default function OnchainAchievementRewardDistribution({ achievementId }: OnchainAchievementRewardDistributionProps) {
  const { address, isConnected } = useAccount()
  const [rewardPool, setRewardPool] = useState('')
  const [distributionAmount, setDistributionAmount] = useState('')
  const [recipientCount, setRecipientCount] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordDistribution = async () => {
    if (!isConnected || !address || !rewardPool.trim() || !distributionAmount.trim()) return

    try {
      const payload = `REWARD_DISTRIBUTION:pool:${rewardPool}:amount:${distributionAmount}:recipients:${recipientCount || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Reward distribution logging failed:', error)
    }
  }

  return (
    <AppCard title="🎁 Reward Distribution" subtitle="Log reward pool payouts" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reward Pool *</label>
          <input
            type="text"
            value={rewardPool}
            onChange={(e) => setRewardPool(e.target.value)}
            placeholder="Retro round, bounty pool"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Distributed Amount *</label>
          <input
            type="text"
            value={distributionAmount}
            onChange={(e) => setDistributionAmount(e.target.value)}
            placeholder="2,500 OP"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Count (optional)</label>
          <input
            type="text"
            value={recipientCount}
            onChange={(e) => setRecipientCount(e.target.value)}
            placeholder="12"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordDistribution}
          disabled={isPending || isConfirming || !isConnected || !rewardPool.trim() || !distributionAmount.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Reward Distribution'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Reward distribution recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
