'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementPerformance() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const performanceScore = Math.min(100, (userPosts?.length || 0) * 3)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚡ Performance Tracker</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-600">{performanceScore}%</p>
          <p className="text-gray-600">Performance Score</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-600 h-2 rounded-full" 
            style={{ width: `${performanceScore}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          Track your achievement performance over time.
        </p>
      </div>
    </div>
  )
}

