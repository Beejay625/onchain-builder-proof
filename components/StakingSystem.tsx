'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEthAmount } from '@/lib/utils'

interface StakingSystemProps {
  achievementId: string
}

export default function StakingSystem({ achievementId }: StakingSystemProps) {
  const [stakeAmount, setStakeAmount] = useState('0.01')
  const [isStaking, setIsStaking] = useState(false)
  const [stakedAmount, setStakedAmount] = useState<bigint>(BigInt(0))

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleStake = async () => {
    setIsStaking(true)
    try {
      // Stake achievement for rewards
      const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: [
          {
            inputs: [
              { name: 'achievementId', type: 'uint256' },
              { name: 'amount', type: 'uint256' },
            ],
            name: 'stake',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
          },
        ],
        functionName: 'stake',
        args: [BigInt(achievementId), parseUnits(stakeAmount, 18)],
        value: parseUnits(stakeAmount, 18),
      })
    } catch (error) {
      console.error('Staking error:', error)
      setIsStaking(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Staking</h3>
      
      {stakedAmount > 0 ? (
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Staked Amount</div>
          <div className="text-2xl font-bold text-green-600">
            {formatEthAmount(stakedAmount)}
          </div>
        </div>
      ) : (
        <div>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Amount to stake"
            className="w-full p-2 border border-gray-300 rounded-lg mb-3"
            step="0.001"
            min="0.001"
          />
          <button
            onClick={handleStake}
            disabled={isPending || isStaking}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPending || isStaking ? 'Staking...' : 'Stake Achievement'}
          </button>
        </div>
      )}

      {isSuccess && (
        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
          ✓ Staked successfully!
        </div>
      )}
    </div>
  )
}
