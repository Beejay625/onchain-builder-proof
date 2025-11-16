'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderMomentumIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const momentumIndex = (userPosts?.length || 0) * 3.5
  const momentumLevel = momentumIndex >= 30 ? 'Strong Momentum' :
                        momentumIndex >= 20 ? 'Good Momentum' :
                        momentumIndex >= 10 ? 'Building' : 'Starting'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚡ Momentum Index</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-600">{momentumIndex.toFixed(1)}</p>
          <p className="text-gray-600">Momentum Index</p>
          <p className="text-lg font-semibold text-red-600 mt-2">{momentumLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track momentum through achievements.
        </p>
      </div>
    </div>
  )
}

