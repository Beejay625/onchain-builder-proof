'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementProgress() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const currentProgress = userPosts?.length || 0
  const nextGoal = 50
  const progressPercent = Math.min(100, (currentProgress / nextGoal) * 100)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Achievement Progress</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 mb-2">
            {currentProgress} / {nextGoal} achievements
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Track your progress toward achievement goals.
        </p>
      </div>
    </div>
  )
}

