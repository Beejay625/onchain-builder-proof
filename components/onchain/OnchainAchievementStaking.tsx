'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementStakingProps {
  achievementId: bigint
}

export default function OnchainAchievementStaking({ achievementId }: OnchainAchievementStakingProps) {
  const { address, isConnected } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('')
  const [stakeDuration, setStakeDuration] = useState(30)
  const [stakePurpose, setStakePurpose] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const stakeOnAchievement = async () => {
    if (!isConnected || !address || !stakeAmount.trim()) return

    try {
      const unlockTimestamp = Date.now() + (stakeDuration * 24 * 60 * 60 * 1000)
      const stakeData = `STAKING:amount:${stakeAmount}:duration:${stakeDuration}:unlock:${unlockTimestamp}:purpose:${stakePurpose || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, stakeData],
      })
    } catch (error) {
      console.error('Staking failed:', error)
    }
  }

  return (
    <AppCard title="🔒 Achievement Staking" subtitle="Stake on achievement with duration" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stake Amount *</label>
          <input
            type="text"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="e.g., 0.1 ETH"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stake Duration (days)</label>
          <input
            type="number"
            min="1"
            max="365"
            value={stakeDuration}
            onChange={(e) => setStakeDuration(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stake Purpose (optional)</label>
          <input
            type="text"
            value={stakePurpose}
            onChange={(e) => setStakePurpose(e.target.value)}
            placeholder="Why are you staking?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={stakeOnAchievement}
          disabled={isPending || isConfirming || !isConnected || !stakeAmount.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Staking...' : 'Stake on Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Staking recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

