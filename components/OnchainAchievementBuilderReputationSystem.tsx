'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBuilderReputationSystem() {
  const { address } = useAccount()
  
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const reputation = (userPostIds?.length || 0) * 10

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⭐ Reputation System</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{reputation}</p>
          <p className="text-sm opacity-90">Reputation Points</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 bg-gray-50 rounded text-center">
            <p className="text-lg font-bold">{userPostIds?.length || 0}</p>
            <p className="text-xs text-gray-600">Posts</p>
          </div>
          <div className="p-2 bg-gray-50 rounded text-center">
            <p className="text-lg font-bold">0</p>
            <p className="text-xs text-gray-600">Likes</p>
          </div>
          <div className="p-2 bg-gray-50 rounded text-center">
            <p className="text-lg font-bold">0</p>
            <p className="text-xs text-gray-600">Comments</p>
          </div>
        </div>
        
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-700">Reputation Tier</p>
          <p className="text-xs text-gray-600">
            {reputation >= 100 ? 'Legend' : reputation >= 50 ? 'Master' : reputation >= 20 ? 'Expert' : 'Builder'}
          </p>
        </div>
      </div>
    </div>
  )
}

