'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderCredibilityScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const credibilityScore = Math.min(100, (userPosts?.length || 0) * 6)
  const credibilityLevel = credibilityScore >= 90 ? 'Elite' :
                           credibilityScore >= 70 ? 'Expert' :
                           credibilityScore >= 50 ? 'Advanced' :
                           credibilityScore >= 30 ? 'Intermediate' : 'Rising'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⭐ Credibility Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-purple-600">{credibilityScore}%</p>
          <p className="text-gray-600">Credibility Score</p>
          <p className="text-lg font-semibold text-indigo-600 mt-2">{credibilityLevel}</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-purple-600 h-3 rounded-full" 
            style={{ width: `${credibilityScore}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          Track your credibility score based on onchain activity.
        </p>
      </div>
    </div>
  )
}

