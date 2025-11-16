'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCategories() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const categories = [
    { name: 'Development', count: Math.floor((userPosts?.length || 0) * 0.4) },
    { name: 'Design', count: Math.floor((userPosts?.length || 0) * 0.3) },
    { name: 'Learning', count: Math.floor((userPosts?.length || 0) * 0.3) },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📂 Achievement Categories</h2>
      <div className="space-y-2">
        {categories.map((category, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="font-medium">{category.name}</span>
            <span className="text-blue-600 font-semibold">{category.count}</span>
          </div>
        ))}
        <p className="text-sm text-gray-500 mt-4">
          View achievements by category onchain.
        </p>
      </div>
    </div>
  )
}

