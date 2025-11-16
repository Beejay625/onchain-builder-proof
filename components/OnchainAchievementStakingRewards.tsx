'use client'

import { useAccount } from 'wagmi'

export default function OnchainAchievementStakingRewards() {
  const { address } = useAccount()
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔒 Achievement Staking Rewards</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-purple-600">0 ETH</p>
          <p className="text-gray-600">Staked Amount</p>
        </div>
        <p className="text-sm text-gray-500">
          Stake ETH on achievements to earn rewards based on duration
        </p>
      </div>
    </div>
  )
}

