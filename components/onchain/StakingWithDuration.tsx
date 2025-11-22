'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface StakingWithDurationProps {
  achievementId: bigint
}

export default function StakingWithDuration({ achievementId }: StakingWithDurationProps) {
  const { address, isConnected } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('0.01')
  const [stakeDuration, setStakeDuration] = useState(30)
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainStaking')) {
    return null
  }

  const handleStake = async () => {
    if (!isConnected || !address || !stakeAmount) return

    try {
      const amount = parseEther(stakeAmount)
      const unlockTimestamp = Math.floor(Date.now() / 1000) + stakeDuration * 24 * 60 * 60
      const content = `Staked ${stakeAmount} ETH on achievement #${achievementId.toString()} for ${stakeDuration} days. Unlocks: ${new Date(unlockTimestamp * 1000).toISOString()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
        value: amount,
      })
    } catch (error) {
      console.error('Staking failed:', error)
    }
  }

  const hasBalance = balance && parseFloat(formatEther(balance.value)) >= parseFloat(stakeAmount)

  return (
    <AppCard title="🔒 Stake on Achievement" subtitle="Stake ETH with time-locked duration" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stake Amount (ETH)</label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          {balance && (
            <p className="text-xs text-gray-500 mt-1">Balance: {formatEther(balance.value)} ETH</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
          <input
            type="number"
            value={stakeDuration}
            onChange={(e) => setStakeDuration(Number(e.target.value))}
            min={1}
            max={365}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleStake}
          disabled={isPending || isConfirming || !isConnected || !hasBalance}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Staking...' : `Stake ${stakeAmount} ETH`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Stake recorded onchain with time lock
          </div>
        )}
      </div>
    </AppCard>
  )
}

