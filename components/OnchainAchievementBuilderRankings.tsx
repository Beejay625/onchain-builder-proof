'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBuilderRankings() {
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏆 Builder Rankings</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🥇</span>
            <div>
              <p className="font-semibold">Top Builder</p>
              <p className="text-sm text-gray-600">Most achievements</p>
            </div>
          </div>
          <span className="text-xl font-bold">{totalPosts?.toString() || '0'}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🥈</span>
            <div>
              <p className="font-semibold">Second Place</p>
              <p className="text-sm text-gray-600">High engagement</p>
            </div>
          </div>
          <span className="text-xl font-bold">-</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🥉</span>
            <div>
              <p className="font-semibold">Third Place</p>
              <p className="text-sm text-gray-600">Active builder</p>
            </div>
          </div>
          <span className="text-xl font-bold">-</span>
        </div>
      </div>
    </div>
  )
}
