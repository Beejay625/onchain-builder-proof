'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface MilestoneRewardsProps {
  milestoneId: string
}

export default function MilestoneRewards({ milestoneId }: MilestoneRewardsProps) {
  const { address, isConnected } = useAccount()
  const [rewardAmount, setRewardAmount] = useState('100')
  const [rewardType, setRewardType] = useState<'tokens' | 'eth' | 'nft'>('tokens')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainMilestoneRewards')) {
    return null
  }

  const handleClaimReward = async () => {
    if (!isConnected || !address || !rewardAmount) return

    try {
      const content = `Milestone Reward Claim\nMilestone: ${milestoneId}\nAmount: ${rewardAmount} ${rewardType}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Reward claim failed:', error)
    }
  }

  return (
    <AppCard title="🎁 Milestone Rewards" subtitle="Claim rewards when reaching milestones" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reward Type</label>
          <select
            value={rewardType}
            onChange={(e) => setRewardType(e.target.value as 'tokens' | 'eth' | 'nft')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="tokens">Tokens</option>
            <option value="eth">ETH</option>
            <option value="nft">NFT</option>
          </select>
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
        <button
          onClick={handleClaimReward}
          disabled={isPending || isConfirming || !isConnected || !rewardAmount}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Claiming...' : 'Claim Reward'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Reward claim recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

