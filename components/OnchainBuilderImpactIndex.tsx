'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderImpactIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const impactIndex = (userPosts?.length || 0) * 12
  const impactLevel = impactIndex >= 300 ? 'High Impact' :
                     impactIndex >= 200 ? 'Moderate Impact' :
                     impactIndex >= 100 ? 'Growing Impact' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💥 Impact Index</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-red-600">{impactIndex}</p>
          <p className="text-gray-600">Impact Index</p>
          <p className="text-lg font-semibold text-orange-600 mt-2">{impactLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your impact through achievements.
        </p>
      </div>
    </div>
  )
}

