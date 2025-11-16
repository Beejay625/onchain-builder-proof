'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderReputationScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const reputationScore = (userPosts?.length || 0) * 15
  const reputationTier = reputationScore >= 1000 ? 'Legend' :
                         reputationScore >= 500 ? 'Master' :
                         reputationScore >= 250 ? 'Expert' :
                         reputationScore >= 100 ? 'Advanced' : 'Rising'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⭐ Reputation Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-amber-600">{reputationScore}</p>
          <p className="text-gray-600">Reputation Points</p>
          <p className="text-lg font-semibold text-purple-600 mt-2">{reputationTier}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your reputation score and tier onchain.
        </p>
      </div>
    </div>
  )
}

