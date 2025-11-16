'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCompletionRate() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const completed = userPosts?.length || 0
  const total = 100
  const completionRate = Math.min(100, (completed / total) * 100)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Completion Rate</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 mb-2">
            {completed} / {total} achievements
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-green-600 h-4 rounded-full" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-center mt-2 text-lg font-semibold text-green-600">
            {completionRate.toFixed(1)}%
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Track your achievement completion rate.
        </p>
      </div>
    </div>
  )
}

