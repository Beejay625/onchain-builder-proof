'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementBuilderStats() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Builder Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{userPosts?.length || 0}</p>
          <p className="text-xs text-gray-600">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">0</p>
          <p className="text-xs text-gray-600">Likes</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">0</p>
          <p className="text-xs text-gray-600">Comments</p>
        </div>
      </div>
    </div>
  )
}

