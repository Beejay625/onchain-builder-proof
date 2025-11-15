'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface TokenRewardsProps {
  achievementId: bigint
  recipient: string
}

export default function TokenRewards({ achievementId, recipient }: TokenRewardsProps) {
  const [rewardAmount, setRewardAmount] = useState('100')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const distributeRewards = async () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'distributeTokenRewards',
        args: [achievementId, recipient as `0x${string}`, BigInt(rewardAmount)],
      })
    } catch (error) {
      console.error('Reward distribution error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🪙 Token Rewards</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Amount</label>
          <input
            type="number"
            value={rewardAmount}
            onChange={(e) => setRewardAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            min="1"
          />
        </div>
        <button
          onClick={distributeRewards}
          disabled={isPending}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending ? 'Distributing...' : 'Distribute Rewards'}
        </button>
        {isSuccess && (
          <div className="p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Rewards distributed onchain
          </div>
        )}
      </div>
    </div>
  )
}
