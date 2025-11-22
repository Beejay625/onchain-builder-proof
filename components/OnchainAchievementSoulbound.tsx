'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Soulbound Tokens
 * Make achievements non-transferable and permanently bound to address
 */
export default function OnchainAchievementSoulbound() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [isSoulbound, setIsSoulbound] = useState(false)

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleToggleSoulbound = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'setSoulbound',
        args: [BigInt(postId), !isSoulbound],
      })
    } catch (error) {
      console.error('Error toggling soulbound:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔒 Soulbound Tokens</h3>
        <p className="text-gray-600">Connect wallet to manage soulbound status</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🔒 Onchain Soulbound Achievements</h3>
      <p className="text-gray-600 mb-4">
        Make achievements non-transferable and permanently bound to address
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isSoulbound}
            onChange={(e) => setIsSoulbound(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm">Make soulbound (non-transferable)</label>
        </div>

        <button
          onClick={handleToggleSoulbound}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Updating...' : '🔒 Update Soulbound Status'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Soulbound status updated
          </div>
        )}
      </div>
    </div>
  )
}


