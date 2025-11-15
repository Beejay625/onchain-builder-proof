'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementChainProps {
  userAddress: `0x${string}`
}

export default function OnchainAchievementChain({ userAddress }: OnchainAchievementChainProps) {
  const { data: userPosts, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: [userAddress],
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">Loading achievement chain...</div>
      </div>
    )
  }

  if (!userPosts || userPosts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">🔗 Onchain Achievement Chain</h3>
        <p className="text-gray-600">No achievements found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔗 Onchain Achievement Chain</h3>
      
      <div className="space-y-3">
        {userPosts.map((postId, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Achievement #{Number(postId)}</div>
                <div className="text-sm text-gray-500">Part of your onchain journey</div>
              </div>
              <div className="text-2xl">🔗</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
        Total: {userPosts.length} achievements in your chain
      </div>
    </div>
  )
}

