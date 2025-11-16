'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementStats() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const totalAchievements = userPosts?.length || 0
  const weeklyAverage = totalAchievements > 0 ? (totalAchievements / 52).toFixed(1) : 0
  const monthlyAverage = totalAchievements > 0 ? (totalAchievements / 12).toFixed(1) : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Achievement Stats</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">{totalAchievements}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{weeklyAverage}</p>
            <p className="text-sm text-gray-600">Weekly</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{monthlyAverage}</p>
            <p className="text-sm text-gray-600">Monthly</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          View comprehensive statistics for your achievements.
        </p>
      </div>
    </div>
  )
}

