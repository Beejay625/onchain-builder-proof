'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementTrends() {
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Achievement Trends</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{totalPosts?.toString() || '0'}</p>
          <p className="text-sm opacity-90">Total Achievements</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-blue-600">↑ Trending</p>
            <p className="text-xs text-gray-600">This week</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-lg font-bold text-green-600">🔥 Hot</p>
            <p className="text-xs text-gray-600">High engagement</p>
          </div>
        </div>
        
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm font-semibold text-purple-700">Trend Analysis</p>
          <p className="text-xs text-gray-600">Growing platform activity</p>
        </div>
      </div>
    </div>
  )
}
