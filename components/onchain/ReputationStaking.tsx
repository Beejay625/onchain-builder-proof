'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ReputationStaking() {
  const { address, isConnected } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('1000')
  const [stakeDuration, setStakeDuration] = useState(90)
  const [expectedReward, setExpectedReward] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainReputationStaking')) {
    return null
  }

  const handleStake = async () => {
    if (!isConnected || !address || !stakeAmount) return

    try {
      const unlockDate = new Date(Date.now() + stakeDuration * 24 * 60 * 60 * 1000)
      const content = `Reputation Staking\nAmount: ${stakeAmount} reputation tokens\nDuration: ${stakeDuration} days\nUnlocks: ${unlockDate.toISOString()}${expectedReward ? `\nExpected Reward: ${expectedReward}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Staking failed:', error)
    }
  }

  return (
    <AppCard title="💰 Reputation Staking" subtitle="Stake reputation tokens to earn rewards" accent="amber">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stake Amount (reputation tokens)</label>
          <input
            type="text"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stake Duration (days)</label>
          <input
            type="number"
            value={stakeDuration}
            onChange={(e) => setStakeDuration(Number(e.target.value))}
            min={1}
            max={365}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expected Reward (optional)</label>
          <input
            type="text"
            value={expectedReward}
            onChange={(e) => setExpectedReward(e.target.value)}
            placeholder="e.g., 10% APY"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleStake}
          disabled={isPending || isConfirming || !isConnected || !stakeAmount}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Staking...' : 'Stake Reputation'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Reputation staking recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

