'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderProductivityScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const productivityScore = Math.min(100, (userPosts?.length || 0) * 6)
  const productivityLevel = productivityScore >= 80 ? 'Highly Productive' :
                           productivityScore >= 60 ? 'Productive' :
                           productivityScore >= 40 ? 'Active' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Productivity Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">{productivityScore}%</p>
          <p className="text-gray-600">Productivity Score</p>
          <p className="text-lg font-semibold text-indigo-600 mt-2">{productivityLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your productivity through achievements.
        </p>
      </div>
    </div>
  )
}

