'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationPools() {
  const { address, isConnected } = useAccount()
  const [poolAmount, setPoolAmount] = useState('')
  const [poolName, setPoolName] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleCreatePool = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createReputationPool',
        args: [poolName, BigInt(poolAmount)],
      })
    } catch (error) {
      console.error('Error creating pool:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">💧 Reputation Pools</h3>
        <p className="text-gray-600">Connect wallet to create pools</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">💧 Reputation Pools</h3>
      <p className="text-gray-600 mb-4">
        Pool reputation tokens for collective staking onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Pool Name</label>
          <input
            type="text"
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
            placeholder="Enter pool name"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Initial Amount</label>
          <input
            type="number"
            value={poolAmount}
            onChange={(e) => setPoolAmount(e.target.value)}
            placeholder="10000"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleCreatePool}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : '💧 Create Pool'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Reputation pool created successfully
          </div>
        )}
      </div>
    </div>
  )
}


