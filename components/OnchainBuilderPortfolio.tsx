'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderPortfolio() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💼 Builder Portfolio</h2>
      <div className="space-y-4">
        <p className="text-gray-600">
          Total Achievements: {userPosts?.length || 0}
        </p>
        <p className="text-sm text-gray-500">
          Aggregate all your onchain achievements into a comprehensive portfolio.
        </p>
      </div>
    </div>
  )
}

