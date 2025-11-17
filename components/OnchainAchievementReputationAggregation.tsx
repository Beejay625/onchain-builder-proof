'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationAggregation() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const aggregatedScore = (userPosts?.length || 0) * 25

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Reputation Aggregation</h2>
      <div className="space-y-2">
        <p className="text-4xl font-bold text-blue-600">{aggregatedScore}</p>
        <p className="text-gray-600">Aggregated score</p>
        <p className="text-sm text-gray-500">
          From {userPosts?.length || 0} achievements
        </p>
      </div>
    </div>
  )
}

