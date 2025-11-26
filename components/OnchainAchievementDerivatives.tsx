'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Derivatives
 * Create derivatives from achievements for trading
 */
export default function OnchainAchievementDerivatives() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [derivativeType, setDerivativeType] = useState('futures')
  const [strikePrice, setStrikePrice] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const derivativeTypes = [
    { value: 'futures', label: 'Futures Contract' },
    { value: 'options', label: 'Options Contract' },
    { value: 'swap', label: 'Swap Contract' },
  ]

  const handleCreateDerivative = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createAchievementDerivative',
        args: [BigInt(postId), derivativeType, BigInt(strikePrice)],
      })
    } catch (error) {
      console.error('Error creating derivative:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📊 Achievement Derivatives</h3>
        <p className="text-gray-600">Connect wallet to create derivatives</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">📊 Achievement Derivatives</h3>
      <p className="text-gray-600 mb-4">
        Create derivatives from achievements for trading onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Achievement ID</label>
          <input
            type="text"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Enter achievement ID"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Derivative Type</label>
          <select
            value={derivativeType}
            onChange={(e) => setDerivativeType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {derivativeTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Strike Price (ETH)</label>
          <input
            type="text"
            value={strikePrice}
            onChange={(e) => setStrikePrice(e.target.value)}
            placeholder="0.1"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleCreateDerivative}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : '📊 Create Derivative'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Derivative created successfully
          </div>
        )}
      </div>
    </div>
  )
}





