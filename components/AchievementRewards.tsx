'use client'

import { useState } from 'react'
import { formatEthAmount } from '@/lib/utils'

interface Reward {
  id: string
  type: 'milestone' | 'streak' | 'engagement' | 'special'
  amount: bigint
  description: string
  claimed: boolean
}

export default function AchievementRewards() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [totalRewards, setTotalRewards] = useState<bigint>(BigInt(0))

  const claimReward = async (rewardId: string) => {
    // Claim reward from smart contract
    setRewards(rewards.map(r => 
      r.id === rewardId ? { ...r, claimed: true } : r
    ))
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'milestone': return '🎯'
      case 'streak': return '🔥'
      case 'engagement': return '💬'
      case 'special': return '⭐'
      default: return '💰'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🎁 Rewards</h2>
        {totalRewards > 0 && (
          <div className="text-right">
            <div className="text-sm text-gray-600">Total Available</div>
            <div className="text-2xl font-bold text-green-600">
              {formatEthAmount(totalRewards)}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {rewards.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No rewards available</p>
        ) : (
          rewards.map((reward) => (
            <div
              key={reward.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getRewardIcon(reward.type)}</span>
                <div>
                  <div className="font-semibold">{reward.description}</div>
                  <div className="text-sm text-gray-600">
                    {formatEthAmount(reward.amount)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => claimReward(reward.id)}
                disabled={reward.claimed}
                className={`px-4 py-2 rounded-lg ${
                  reward.claimed
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {reward.claimed ? 'Claimed' : 'Claim'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
