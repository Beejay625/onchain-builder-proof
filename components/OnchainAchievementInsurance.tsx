'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Insurance
 * Insure achievements against loss or disputes
 */
export default function OnchainAchievementInsurance() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [coverageAmount, setCoverageAmount] = useState('')
  const [premium, setPremium] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handlePurchaseInsurance = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'purchaseAchievementInsurance',
        args: [BigInt(postId), BigInt(coverageAmount)],
        value: BigInt(premium),
      })
    } catch (error) {
      console.error('Error purchasing insurance:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🛡️ Achievement Insurance</h3>
        <p className="text-gray-600">Connect wallet to purchase insurance</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🛡️ Achievement Insurance</h3>
      <p className="text-gray-600 mb-4">
        Insure achievements against loss or disputes onchain
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
          <label className="block text-sm font-medium mb-2">Coverage Amount (ETH)</label>
          <input
            type="text"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(e.target.value)}
            placeholder="1.0"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Premium (ETH)</label>
          <input
            type="text"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            placeholder="0.01"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handlePurchaseInsurance}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : '🛡️ Purchase Insurance'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Insurance purchased successfully
          </div>
        )}
      </div>
    </div>
  )
}
