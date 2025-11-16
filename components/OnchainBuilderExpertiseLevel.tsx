'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderExpertiseLevel() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const expertiseLevel = (userPosts?.length || 0) >= 50 ? 'Expert' :
                        (userPosts?.length || 0) >= 25 ? 'Advanced' :
                        (userPosts?.length || 0) >= 10 ? 'Intermediate' :
                        (userPosts?.length || 0) >= 5 ? 'Beginner' : 'Novice'
  const expertiseScore = Math.min(100, (userPosts?.length || 0) * 2)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎓 Expertise Level</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">{expertiseLevel}</p>
          <p className="text-gray-600">Expertise Level</p>
          <p className="text-lg font-semibold text-indigo-600 mt-2">{expertiseScore}% Score</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your expertise level through achievements.
        </p>
      </div>
    </div>
  )
}

