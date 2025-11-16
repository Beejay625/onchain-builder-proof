'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderReliabilityScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const reliabilityScore = Math.min(100, (userPosts?.length || 0) * 5.3)
  const reliabilityLevel = reliabilityScore >= 85 ? 'Highly Reliable' :
                          reliabilityScore >= 65 ? 'Reliable' :
                          reliabilityScore >= 45 ? 'Dependable' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔒 Reliability Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{reliabilityScore.toFixed(0)}%</p>
          <p className="text-gray-600">Reliability Score</p>
          <p className="text-lg font-semibold text-emerald-600 mt-2">{reliabilityLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your reliability through achievements.
        </p>
      </div>
    </div>
  )
}

