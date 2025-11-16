'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementVelocity() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const velocity = (userPosts?.length || 0) * 2
  const velocityTrend = velocity > 10 ? 'High' : velocity > 5 ? 'Medium' : 'Steady'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚡ Achievement Velocity</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-orange-600">{velocity}</p>
          <p className="text-gray-600">Velocity Score</p>
          <p className="text-lg font-semibold text-red-600 mt-2">{velocityTrend}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your achievement velocity onchain.
        </p>
      </div>
    </div>
  )
}

