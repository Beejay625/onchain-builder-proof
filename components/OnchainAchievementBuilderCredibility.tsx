'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBuilderCredibility() {
  const { address } = useAccount()
  
  const { data: userPostIds } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const credibilityScore = (userPostIds?.length || 0) * 10

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⭐ Builder Credibility</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{credibilityScore}</p>
          <p className="text-sm opacity-90">Credibility Score</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-700">{userPostIds?.length || 0}</p>
            <p className="text-xs text-gray-600">Achievements</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-gray-700">
              {credibilityScore >= 50 ? 'High' : credibilityScore >= 20 ? 'Medium' : 'Low'}
            </p>
            <p className="text-xs text-gray-600">Credibility Level</p>
          </div>
        </div>
      </div>
    </div>
  )
}

