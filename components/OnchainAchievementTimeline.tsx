'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementTimeline() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const timelineEvents = userPosts?.length || 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Achievement Timeline</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{timelineEvents}</p>
          <p className="text-gray-600">Timeline Events</p>
        </div>
        <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-400">Timeline Visualization</p>
        </div>
        <p className="text-sm text-gray-500">
          View your achievement timeline onchain.
        </p>
      </div>
    </div>
  )
}

