'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderActivityFeed() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const recentActivity = (userPosts?.length || 0) > 0 ? 'Active' : 'No recent activity'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📰 Activity Feed</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">{recentActivity}</p>
          <p className="text-sm text-gray-600 mt-1">
            {userPosts?.length || 0} total achievements
          </p>
        </div>
        <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-400">Activity Timeline</p>
        </div>
        <p className="text-sm text-gray-500">
          View your recent onchain activity feed.
        </p>
      </div>
    </div>
  )
}

