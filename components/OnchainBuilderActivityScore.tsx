'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderActivityScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const activityScore = (userPosts?.length || 0) * 8
  const activityLevel = activityScore >= 200 ? 'Very Active' :
                       activityScore >= 100 ? 'Active' :
                       activityScore >= 50 ? 'Moderate' : 'Starting'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚡ Activity Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-600">{activityScore}</p>
          <p className="text-gray-600">Activity Score</p>
          <p className="text-lg font-semibold text-red-600 mt-2">{activityLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your activity through achievements.
        </p>
      </div>
    </div>
  )
}

