'use client'

import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress, getTimeAgo } from '@/lib/utils'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function OnchainAchievementsList() {
  const { data: totalPosts, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">⛓️ All Onchain Achievements</h2>
        <div className="text-right">
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-2xl font-bold text-blue-600">
            {isLoading ? '...' : totalPosts?.toString() || '0'}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            All achievements are permanently stored on Base blockchain. 
            Each achievement is verifiable and immutable.
          </p>
        </div>

        <div className="text-center text-gray-500 py-8">
          <p>Loading achievements from blockchain...</p>
          <p className="text-sm mt-2">Querying smart contract events</p>
        </div>
      </div>
    </div>
  )
}
