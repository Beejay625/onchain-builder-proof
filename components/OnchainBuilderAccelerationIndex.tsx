'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderAccelerationIndex() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const accelerationIndex = (userPosts?.length || 0) * 2.8
  const accelerationLevel = accelerationIndex >= 25 ? 'Rapid Acceleration' :
                            accelerationIndex >= 15 ? 'Accelerating' :
                            accelerationIndex >= 8 ? 'Speeding Up' : 'Starting'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🚀 Acceleration Index</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600">{accelerationIndex.toFixed(1)}</p>
          <p className="text-gray-600">Acceleration Index</p>
          <p className="text-lg font-semibold text-cyan-600 mt-2">{accelerationLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track acceleration through achievements.
        </p>
      </div>
    </div>
  )
}

