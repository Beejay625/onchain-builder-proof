'use client'

import { useAccount, useReadContract } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementAchievementWeight() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')

  const { data: weight, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getAchievementWeight',
    args: postId ? [BigInt(postId)] : undefined,
    query: {
      enabled: !!postId && isConnected,
    },
  })

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⚖️ Achievement Weight</h3>
        <p className="text-gray-600">Connect wallet to view weight</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⚖️ Achievement Weight</h3>
      <p className="text-gray-600 mb-4">
        View achievement weight based on engagement and verification
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

        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading weight...</div>
        ) : weight !== undefined && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Achievement Weight</p>
            <p className="text-3xl font-bold text-blue-600">{weight?.toString() || '0'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
