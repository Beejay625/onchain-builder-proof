'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementStakingRewardsProps {
  achievementId: bigint
}

export default function AchievementStakingRewards({ achievementId }: AchievementStakingRewardsProps) {
  const { address, isConnected } = useAccount()
  const [stakingPlatform, setStakingPlatform] = useState('Base Stakers')
  const [rewardToken, setRewardToken] = useState('BUILDER')
  const [rewardAmount, setRewardAmount] = useState('0')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementStakingRewards')) {
    return null
  }

  const handleRecordRewards = async () => {
    if (!isConnected || !address || !rewardAmount.trim()) return

    try {
      const content = `Staking Rewards\nAchievement: #${achievementId.toString()}\nProgram: ${stakingPlatform}\nToken: ${rewardToken}\nReward: ${rewardAmount}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Staking rewards log failed:', error)
    }
  }

  return (
    <AppCard title="🎖️ Staking Rewards" subtitle="Document staking reward accruals and payouts" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Staking Program</label>
          <input
            type="text"
            value={stakingPlatform}
            onChange={(e) => setStakingPlatform(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reward Token</label>
            <input
              type="text"
              value={rewardToken}
              onChange={(e) => setRewardToken(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reward Amount</label>
            <input
              type="text"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleRecordRewards}
          disabled={isPending || isConfirming || !isConnected || !rewardAmount.trim()}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Staking Rewards'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Staking rewards recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

