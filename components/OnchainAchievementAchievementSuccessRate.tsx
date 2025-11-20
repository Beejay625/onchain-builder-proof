'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementSuccessRate() {
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

  const successRate = userPostIds && userPostIds.length > 0 ? 100 : 0

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Success Rate</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{successRate}%</p>
          <p className="text-sm opacity-90">Success Rate</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-blue-600">{userPostIds?.length || 0}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-lg font-bold text-green-600">0</p>
            <p className="text-xs text-gray-600">In Progress</p>
          </div>
        </div>
        
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-sm font-semibold text-emerald-700">Success Status</p>
          <p className="text-xs text-gray-600">
            {successRate >= 80 ? 'Excellent' : successRate >= 50 ? 'Good' : 'Building'}
          </p>
        </div>
      </div>
    </div>
  )
}

