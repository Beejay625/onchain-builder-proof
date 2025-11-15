'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEthAmount } from '@/lib/utils'

interface StakingPool {
  id: string
  badgeName: string
  apy: number
  totalStaked: bigint
  yourStake: bigint
}

export default function BadgeStaking() {
  const [pools, setPools] = useState<StakingPool[]>([])
  const [stakeAmount, setStakeAmount] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const stakeBadge = async (poolId: string) => {
    // Stake badge in pool
    console.log('Staking badge:', poolId, stakeAmount)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">💰 Staking Pools</h2>
      
      <div className="space-y-4">
        {pools.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No staking pools available</p>
        ) : (
          pools.map((pool) => (
            <div key={pool.id} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{pool.badgeName}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">APY</div>
                  <div className="text-xl font-bold text-green-600">{pool.apy}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Staked</div>
                  <div className="text-lg font-bold">{formatEthAmount(pool.totalStaked)}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="Amount"
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => stakeBadge(pool.id)}
                  disabled={isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Stake
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
