'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderReputationSystem() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const reputation = (userPosts?.length || 0) * 10

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⭐ Reputation System</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-amber-600">{reputation}</p>
          <p className="text-gray-600">Reputation Points</p>
        </div>
        <p className="text-sm text-gray-500">
          Build reputation through onchain achievements and interactions.
        </p>
      </div>
    </div>
  )
}

