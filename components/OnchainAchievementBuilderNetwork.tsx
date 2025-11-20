'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBuilderNetwork() {
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
      <h3 className="text-xl font-bold mb-4">🌐 Builder Network</h3>
      
      <div className="space-y-3">
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="font-semibold text-blue-700">Network Size</p>
          <p className="text-2xl font-bold text-blue-600">{userPostIds?.length || 0}</p>
          <p className="text-xs text-gray-600">Connected builders</p>
        </div>
        
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="font-semibold text-green-700">Your Connections</p>
          <p className="text-lg font-bold text-green-600">-</p>
          <p className="text-xs text-gray-600">Active connections</p>
        </div>
        
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="font-semibold text-purple-700">Network Strength</p>
          <p className="text-lg font-bold text-purple-600">High</p>
          <p className="text-xs text-gray-600">Based on achievements</p>
        </div>
      </div>
    </div>
  )
}
