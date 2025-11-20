'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationBonding() {
  const { address, isConnected } = useAccount()
  const [bondAmount, setBondAmount] = useState('')
  const [bondDuration, setBondDuration] = useState('30')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleCreateBond = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createReputationBond',
        args: [BigInt(bondAmount), BigInt(bondDuration)],
      })
    } catch (error) {
      console.error('Error creating bond:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔗 Reputation Bonding</h3>
        <p className="text-gray-600">Connect wallet to create bonds</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🔗 Reputation Bonding</h3>
      <p className="text-gray-600 mb-4">
        Create reputation bonds with lock periods onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Bond Amount</label>
          <input
            type="number"
            value={bondAmount}
            onChange={(e) => setBondAmount(e.target.value)}
            placeholder="10000"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Duration (days)</label>
          <input
            type="number"
            value={bondDuration}
            onChange={(e) => setBondDuration(e.target.value)}
            min="1"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleCreateBond}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : '🔗 Create Bond'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Reputation bond created successfully
          </div>
        )}
      </div>
    </div>
  )
}
