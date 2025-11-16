'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderGrowthTracker() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const growthRate = (userPosts?.length || 0) > 0 ? 
    ((userPosts.length / 100) * 100).toFixed(1) : '0.0'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Growth Tracker</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{growthRate}%</p>
          <p className="text-gray-600">Growth Rate</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full" 
            style={{ width: `${Math.min(100, parseFloat(growthRate))}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          Track your growth over time onchain.
        </p>
      </div>
    </div>
  )
}

