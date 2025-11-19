'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Expiration System
 * Set expiration dates for achievements
 */
export default function OnchainAchievementExpiration() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [expirationDate, setExpirationDate] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleSetExpiration = async () => {
    if (!isConnected || !address) return
    
    const timestamp = Math.floor(new Date(expirationDate).getTime() / 1000)
    if (timestamp <= Date.now() / 1000) {
      alert('Expiration date must be in the future')
      return
    }

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'setAchievementExpiration',
        args: [BigInt(postId), BigInt(timestamp)],
      })
    } catch (error) {
      console.error('Error setting expiration:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⏳ Expiration System</h3>
        <p className="text-gray-600">Connect wallet to set expiration</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⏳ Onchain Achievement Expiration</h3>
      <p className="text-gray-600 mb-4">
        Set expiration dates for achievements onchain
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
          <label className="block text-sm font-medium mb-2">Expiration Date</label>
          <input
            type="datetime-local"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSetExpiration}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : '⏳ Set Expiration'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Expiration date set successfully
          </div>
        )}
      </div>
    </div>
  )
}

