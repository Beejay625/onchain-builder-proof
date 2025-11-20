'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationReweighting() {
  const { address, isConnected } = useAccount()
  const [newWeight, setNewWeight] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleReweight = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'reweightReputation',
        args: [BigInt(newWeight)],
      })
    } catch (error) {
      console.error('Error reweighting:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⚖️ Reputation Reweighting</h3>
        <p className="text-gray-600">Connect wallet to reweight</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⚖️ Reputation Reweighting</h3>
      <p className="text-gray-600 mb-4">
        Dynamically adjust reputation weights onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">New Weight</label>
          <input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="100"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleReweight}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Reweighting...' : '⚖️ Reweight'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Reputation reweighted successfully
          </div>
        )}
      </div>
    </div>
  )
}
