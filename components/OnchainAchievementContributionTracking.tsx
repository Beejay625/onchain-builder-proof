'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementContributionTracking() {
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
      <h3 className="text-xl font-bold mb-4">📊 Contribution Tracking</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{userPostIds?.length || 0}</p>
          <p className="text-sm text-gray-600">Achievements</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-green-600">0</p>
          <p className="text-sm text-gray-600">Contributions</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">0</p>
          <p className="text-sm text-gray-600">Collaborations</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-2xl font-bold text-yellow-600">0</p>
          <p className="text-sm text-gray-600">Endorsements</p>
        </div>
      </div>
    </div>
  )
}
