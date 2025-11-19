'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Reputation Mining
 * Mine reputation tokens through achievement activities
 */
export default function OnchainAchievementReputationMining() {
  const { address, isConnected } = useAccount()
  const [miningType, setMiningType] = useState('achievement')
  const [amount, setAmount] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const miningTypes = [
    { value: 'achievement', label: 'Achievement Mining' },
    { value: 'engagement', label: 'Engagement Mining' },
    { value: 'verification', label: 'Verification Mining' },
  ]

  const handleMineReputation = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'mineReputation',
        args: [miningType, BigInt(amount)],
      })
    } catch (error) {
      console.error('Error mining reputation:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⛏️ Reputation Mining</h3>
        <p className="text-gray-600">Connect wallet to mine reputation</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⛏️ Reputation Mining</h3>
      <p className="text-gray-600 mb-4">
        Mine reputation tokens through achievement activities onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Mining Type</label>
          <select
            value={miningType}
            onChange={(e) => setMiningType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {miningTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleMineReputation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Mining...' : '⛏️ Mine Reputation'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Reputation mined successfully
          </div>
        )}
      </div>
    </div>
  )
}
