'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementRewardDistributionProps {
  achievementId: bigint
}

export default function AchievementRewardDistribution({ achievementId }: AchievementRewardDistributionProps) {
  const { address, isConnected } = useAccount()
  const [recipientAddress, setRecipientAddress] = useState('')
  const [rewardAmount, setRewardAmount] = useState('')
  const [distributionType, setDistributionType] = useState<'proportional' | 'equal' | 'custom'>('proportional')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementRewardDistribution')) {
    return null
  }

  const handleDistributeRewards = async () => {
    if (!isConnected || !address || !recipientAddress.trim() || !rewardAmount.trim()) return

    try {
      const content = `Reward Distribution\nAchievement: #${achievementId.toString()}\nRecipient: ${recipientAddress}\nAmount: ${rewardAmount}\nType: ${distributionType}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Reward distribution failed:', error)
    }
  }

  return (
    <AppCard title="🎁 Achievement Reward Distribution" subtitle="Track reward distribution metrics in DeFi protocols" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Distribution Type</label>
          <select
            value={distributionType}
            onChange={(e) => setDistributionType(e.target.value as 'proportional' | 'equal' | 'custom')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="proportional">Proportional</option>
            <option value="equal">Equal</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reward Amount</label>
          <input
            type="text"
            value={rewardAmount}
            onChange={(e) => setRewardAmount(e.target.value)}
            placeholder="100"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleDistributeRewards}
          disabled={isPending || isConfirming || !isConnected || !recipientAddress.trim() || !rewardAmount.trim() || !recipientAddress.startsWith('0x')}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Distributing...' : 'Distribute Rewards'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Rewards distributed onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

