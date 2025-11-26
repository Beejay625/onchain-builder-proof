'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationYieldFarming() {
  const { address, isConnected } = useAccount()
  const [farmAmount, setFarmAmount] = useState('')
  const [farmType, setFarmType] = useState('lp')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleStartFarming = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'startYieldFarming',
        args: [farmType, BigInt(farmAmount)],
      })
    } catch (error) {
      console.error('Error starting yield farming:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🌾 Yield Farming</h3>
        <p className="text-gray-600">Connect wallet to start farming</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🌾 Reputation Yield Farming</h3>
      <p className="text-gray-600 mb-4">
        Farm reputation yield from achievement staking onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Farm Type</label>
          <select
            value={farmType}
            onChange={(e) => setFarmType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="lp">Liquidity Pool</option>
            <option value="single">Single Asset</option>
            <option value="multi">Multi-Asset</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Farm Amount</label>
          <input
            type="number"
            value={farmAmount}
            onChange={(e) => setFarmAmount(e.target.value)}
            placeholder="10000"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleStartFarming}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Starting...' : '🌾 Start Yield Farming'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Yield farming started successfully
          </div>
        )}
      </div>
    </div>
  )
}





