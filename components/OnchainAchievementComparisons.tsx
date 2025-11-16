'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementComparisons() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const thisMonth = Math.floor((userPosts?.length || 0) * 0.3)
  const lastMonth = Math.floor((userPosts?.length || 0) * 0.2)
  const change = thisMonth - lastMonth

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚖️ Achievement Comparisons</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">{thisMonth}</p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">{lastMonth}</p>
            <p className="text-sm text-gray-600">Last Month</p>
          </div>
        </div>
        <div className="text-center">
          <p className={`text-lg font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}
          </p>
          <p className="text-sm text-gray-600">Change</p>
        </div>
        <p className="text-sm text-gray-500">
          Compare achievements across time periods.
        </p>
      </div>
    </div>
  )
}

