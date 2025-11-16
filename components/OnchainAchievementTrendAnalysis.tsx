'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementTrendAnalysis() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const trend = (userPosts?.length || 0) > 10 ? 'Upward' :
               (userPosts?.length || 0) > 5 ? 'Stable' : 'Starting'
  const trendStrength = (userPosts?.length || 0) > 15 ? 'Strong' :
                       (userPosts?.length || 0) > 8 ? 'Moderate' : 'Weak'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Trend Analysis</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">{trend}</p>
          <p className="text-gray-600">Trend Direction</p>
          <p className="text-lg font-semibold text-emerald-600 mt-2">{trendStrength} Trend</p>
        </div>
        <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-400">Trend Chart</p>
        </div>
        <p className="text-sm text-gray-500">
          Analyze achievement trends onchain.
        </p>
      </div>
    </div>
  )
}

