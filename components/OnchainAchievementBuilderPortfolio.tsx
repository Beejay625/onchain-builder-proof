'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBuilderPortfolio() {
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💼 Builder Portfolio</h3>
      
      <div className="space-y-3">
        <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
          <p className="text-3xl font-bold">{userPostIds?.length || 0}</p>
          <p className="text-sm opacity-90">Portfolio Items</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-lg font-bold text-blue-600">{userPostIds?.length || 0}</p>
            <p className="text-xs text-gray-600">Achievements</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-lg font-bold text-green-600">0</p>
            <p className="text-xs text-gray-600">Projects</p>
          </div>
        </div>
        
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm font-semibold text-purple-700">Portfolio Status</p>
          <p className="text-xs text-gray-600">All achievements onchain</p>
        </div>
      </div>
    </div>
  )
}





