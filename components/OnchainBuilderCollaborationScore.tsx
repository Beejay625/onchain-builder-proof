'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderCollaborationScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const collaborationScore = Math.min(100, (userPosts?.length || 0) * 4)
  const collaborationLevel = collaborationScore >= 70 ? 'Highly Collaborative' :
                             collaborationScore >= 50 ? 'Collaborative' :
                             collaborationScore >= 30 ? 'Moderate' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🤝 Collaboration Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-pink-600">{collaborationScore}%</p>
          <p className="text-gray-600">Collaboration Score</p>
          <p className="text-lg font-semibold text-rose-600 mt-2">{collaborationLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your collaboration through achievements.
        </p>
      </div>
    </div>
  )
}

