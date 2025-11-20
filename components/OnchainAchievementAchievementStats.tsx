'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementStats() {
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
  
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Achievement Stats</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{userPostIds?.length || 0}</p>
          <p className="text-sm text-gray-600">Your Achievements</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{totalPosts?.toString() || '0'}</p>
          <p className="text-sm text-gray-600">Total Platform</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">
            {totalPosts && userPostIds ? ((userPostIds.length / Number(totalPosts)) * 100).toFixed(1) : '0'}%
          </p>
          <p className="text-sm text-gray-600">Your Share</p>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-2xl font-bold text-yellow-600">-</p>
          <p className="text-sm text-gray-600">Avg Engagement</p>
        </div>
      </div>
    </div>
  )
}
