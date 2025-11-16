'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderEngagementMetrics() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const engagement = (userPosts?.length || 0) * 5
  const engagementRate = Math.min(100, (userPosts?.length || 0) * 2)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💬 Engagement Metrics</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-purple-600">{engagement}</p>
            <p className="text-sm text-gray-600">Total Engagement</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-600">{engagementRate}%</p>
            <p className="text-sm text-gray-600">Engagement Rate</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Track engagement with your achievements.
        </p>
      </div>
    </div>
  )
}

