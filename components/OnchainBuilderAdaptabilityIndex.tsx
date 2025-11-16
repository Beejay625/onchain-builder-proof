'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderAdaptabilityIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const adaptabilityIndex = Math.min(100, (userPosts?.length || 0) * 4)
  const adaptabilityLevel = adaptabilityIndex >= 75 ? 'Highly Adaptable' :
                           adaptabilityIndex >= 50 ? 'Adaptable' :
                           adaptabilityIndex >= 25 ? 'Flexible' : 'Learning'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔄 Adaptability Index</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-cyan-600">{adaptabilityIndex}</p>
          <p className="text-gray-600">Adaptability Index</p>
          <p className="text-lg font-semibold text-blue-600 mt-2">{adaptabilityLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your adaptability through diverse achievements.
        </p>
      </div>
    </div>
  )
}

