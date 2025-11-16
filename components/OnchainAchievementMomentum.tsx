'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMomentum() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const momentum = (userPosts?.length || 0) * 3
  const momentumStatus = momentum > 20 ? 'Strong Momentum' :
                        momentum > 10 ? 'Good Momentum' :
                        momentum > 5 ? 'Building Momentum' : 'Starting'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🚀 Achievement Momentum</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{momentum}</p>
          <p className="text-gray-600">Momentum Score</p>
          <p className="text-lg font-semibold text-emerald-600 mt-2">{momentumStatus}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your achievement momentum onchain.
        </p>
      </div>
    </div>
  )
}

