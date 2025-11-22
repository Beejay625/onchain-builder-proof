'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementEngagementProps {
  achievementId: bigint
}

export default function OnchainAchievementEngagement({ achievementId }: OnchainAchievementEngagementProps) {
  const { address } = useAccount()
  const [engagementRate, setEngagementRate] = useState('')
  const [engagementType, setEngagementType] = useState('views')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateEngagement = async () => {
    if (!address || !engagementRate.trim()) return
    
    const engagementData = `ENGAGEMENT:type:${engagementType}:rate:${engagementRate.trim()}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, engagementData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💬 Achievement Engagement</h3>
      
      <select
        value={engagementType}
        onChange={(e) => setEngagementType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="views">Views</option>
        <option value="likes">Likes</option>
        <option value="comments">Comments</option>
        <option value="shares">Shares</option>
        <option value="clicks">Clicks</option>
      </select>
      
      <input
        type="number"
        value={engagementRate}
        onChange={(e) => setEngagementRate(e.target.value)}
        placeholder="Engagement rate or count"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={updateEngagement}
        disabled={isPending || isConfirming || !engagementRate.trim()}
        className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Engagement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Engagement updated onchain
        </div>
      )}
    </div>
  )
}


