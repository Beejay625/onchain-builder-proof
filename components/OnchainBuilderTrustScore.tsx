'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderTrustScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const trustScore = Math.min(100, (userPosts?.length || 0) * 4)
  const trustLevel = trustScore >= 80 ? 'High' :
                    trustScore >= 60 ? 'Medium' :
                    trustScore >= 40 ? 'Moderate' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🛡️ Trust Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-indigo-600">{trustScore}%</p>
          <p className="text-gray-600">Trust Score</p>
          <p className="text-lg font-semibold text-blue-600 mt-2">{trustLevel}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-indigo-600 h-3 rounded-full" 
            style={{ width: `${trustScore}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          Build trust through verified onchain achievements.
        </p>
      </div>
    </div>
  )
}

