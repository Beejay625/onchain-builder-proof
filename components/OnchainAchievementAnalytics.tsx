'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAnalytics() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const totalAchievements = userPosts?.length || 0
  const growthRate = totalAchievements > 0 ? ((totalAchievements / 100) * 100).toFixed(1) : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Achievement Analytics</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">{totalAchievements}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{growthRate}%</p>
            <p className="text-sm text-gray-600">Growth Rate</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Comprehensive analytics for your achievements.
        </p>
      </div>
    </div>
  )
}
