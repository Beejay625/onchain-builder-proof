'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderCommunityScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const communityScore = (userPosts?.length || 0) * 6
  const communityLevel = communityScore >= 150 ? 'Active Community Member' :
                         communityScore >= 100 ? 'Engaged Member' :
                         communityScore >= 50 ? 'Participating' : 'Joining'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Community Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-teal-600">{communityScore}</p>
          <p className="text-gray-600">Community Score</p>
          <p className="text-lg font-semibold text-cyan-600 mt-2">{communityLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your community engagement through achievements.
        </p>
      </div>
    </div>
  )
}

