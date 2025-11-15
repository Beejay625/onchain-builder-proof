'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface MilestoneRewardsProps {
  milestone: number
}

export default function MilestoneRewards({ milestone }: MilestoneRewardsProps) {
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const claimReward = async () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'claimMilestoneReward',
        args: [BigInt(milestone)],
      })
    } catch (error) {
      console.error('Reward claim error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎁 Milestone Rewards</h3>
      <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg mb-4">
        <div className="text-sm text-gray-600 mb-1">Milestone {milestone}</div>
        <div className="text-lg font-bold text-orange-600">Reward Available</div>
      </div>
      <button
        onClick={claimReward}
        disabled={isPending}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending ? 'Claiming...' : 'Claim Reward'}
      </button>
      {isSuccess && (
        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
          ✓ Reward claimed successfully
        </div>
      )}
    </div>
  )
}
