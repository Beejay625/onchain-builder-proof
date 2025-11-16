'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementDynamicPricing() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const basePrice = 0.01
  const dynamicPrice = basePrice * (1 + (userPosts?.length || 0) * 0.1)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Dynamic Pricing</h2>
      <div className="space-y-2">
        <p className="text-4xl font-bold text-yellow-600">{dynamicPrice.toFixed(4)} ETH</p>
        <p className="text-gray-600">Current price</p>
        <p className="text-sm text-gray-500">
          Based on achievement count
        </p>
      </div>
    </div>
  )
}

