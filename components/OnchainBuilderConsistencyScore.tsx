'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderConsistencyScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const consistencyScore = Math.min(100, (userPosts?.length || 0) * 3)
  const consistencyLevel = consistencyScore >= 75 ? 'Very Consistent' :
                           consistencyScore >= 50 ? 'Consistent' :
                           consistencyScore >= 25 ? 'Moderate' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Consistency Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">{consistencyScore}%</p>
          <p className="text-gray-600">Consistency Score</p>
          <p className="text-lg font-semibold text-indigo-600 mt-2">{consistencyLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your building consistency onchain.
        </p>
      </div>
    </div>
  )
}

