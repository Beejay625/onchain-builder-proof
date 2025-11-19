'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Chains
 * Link achievements in sequences to show progression
 */
export default function OnchainAchievementChains() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [previousPostId, setPreviousPostId] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleLinkChain = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'linkAchievementChain',
        args: [BigInt(postId), BigInt(previousPostId)],
      })
    } catch (error) {
      console.error('Error linking chain:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔗 Achievement Chains</h3>
        <p className="text-gray-600">Connect wallet to link chains</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🔗 Achievement Chains</h3>
      <p className="text-gray-600 mb-4">
        Link achievements in sequences to show progression onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Current Achievement ID</label>
          <input
            type="text"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Enter achievement ID"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Previous Achievement ID</label>
          <input
            type="text"
            value={previousPostId}
            onChange={(e) => setPreviousPostId(e.target.value)}
            placeholder="Enter previous achievement ID"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleLinkChain}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Linking...' : '🔗 Link Achievement Chain'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Achievement chain linked successfully
          </div>
        )}
      </div>
    </div>
  )
}

