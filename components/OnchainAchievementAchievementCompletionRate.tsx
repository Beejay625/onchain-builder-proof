'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementCompletionRate() {
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

  const completionRate = userPostIds && userPostIds.length > 0 ? 100 : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Completion Rate</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{completionRate}%</p>
          <p className="text-sm opacity-90">Completion Rate</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-blue-600">{userPostIds?.length || 0}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-lg font-bold text-purple-600">0</p>
            <p className="text-xs text-gray-600">Pending</p>
          </div>
        </div>
        
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="text-sm font-semibold text-indigo-700">Completion Status</p>
          <p className="text-xs text-gray-600">
            {completionRate >= 90 ? 'Excellent' : completionRate >= 70 ? 'Good' : 'In Progress'}
          </p>
        </div>
      </div>
    </div>
  )
}

