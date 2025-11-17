'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const indexValue = (userPosts?.length || 0) * 1.2

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Reputation Index</h2>
      <div className="space-y-2">
        <p className="text-4xl font-bold text-green-600">{indexValue.toFixed(2)}</p>
        <p className="text-gray-600">Index value</p>
        <p className="text-sm text-gray-500">
          Based on {userPosts?.length || 0} achievements
        </p>
      </div>
    </div>
  )
}

