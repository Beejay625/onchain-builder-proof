'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatEthAmount } from 'viem'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function ReputationStaking() {
  const [stakeAmount, setStakeAmount] = useState('0.1')
  const [duration, setDuration] = useState('30')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const stakeReputation = async () => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'stakeReputation',
        args: [parseUnits(stakeAmount, 18), BigInt(parseInt(duration))],
        value: parseUnits(stakeAmount, 18),
      })
    } catch (error) {
      console.error('Staking error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💰 Stake Reputation</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Amount (ETH)</label>
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Duration (days)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            min="1"
          />
        </div>
        <button
          onClick={stakeReputation}
          disabled={isPending}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Staking...' : 'Stake Reputation'}
        </button>
        {isSuccess && (
          <div className="p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Reputation staked successfully
          </div>
        )}
      </div>
    </div>
  )
}
