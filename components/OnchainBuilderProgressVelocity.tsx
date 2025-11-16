'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderProgressVelocity() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const progressVelocity = (userPosts?.length || 0) * 2.2
  const velocityStatus = progressVelocity >= 25 ? 'Rapid Progress' :
                        progressVelocity >= 15 ? 'Steady Progress' :
                        progressVelocity >= 8 ? 'Progressing' : 'Starting'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🚀 Progress Velocity</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{progressVelocity.toFixed(1)}</p>
          <p className="text-gray-600">Progress Velocity</p>
          <p className="text-lg font-semibold text-emerald-600 mt-2">{velocityStatus}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your progress velocity onchain.
        </p>
      </div>
    </div>
  )
}

