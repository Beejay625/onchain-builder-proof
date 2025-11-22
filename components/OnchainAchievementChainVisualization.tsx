'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementChainVisualizationProps {
  achievementId: bigint
}

export default function OnchainAchievementChainVisualization({ achievementId }: OnchainAchievementChainVisualizationProps) {
  const { address } = useAccount()
  
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (isLoading || !post) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">🔗 Chain Visualization</h3>
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔗 Achievement Chain</h3>
      
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div>
            <p className="font-semibold">Achievement #{post.id.toString()}</p>
            <p className="text-xs text-gray-600">Created</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div>
            <p className="font-semibold">Onchain Record</p>
            <p className="text-xs text-gray-600">Base Chain</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <div>
            <p className="font-semibold">Connected</p>
            <p className="text-xs text-gray-600">Blockchain Network</p>
          </div>
        </div>
      </div>
    </div>
  )
}


