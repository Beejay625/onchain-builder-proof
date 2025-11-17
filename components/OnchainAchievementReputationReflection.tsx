'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationReflection() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const reflectionRate = (userPosts?.length || 0) * 0.5

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🪞 Reputation Reflection</h2>
      <div className="space-y-2">
        <p className="text-4xl font-bold text-pink-600">{reflectionRate.toFixed(1)}%</p>
        <p className="text-gray-600">Reflection rate</p>
        <p className="text-sm text-gray-500">
          Auto-distributed to holders
        </p>
      </div>
    </div>
  )
}

