'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementEfficiency() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const efficiency = Math.min(100, (userPosts?.length || 0) * 5)
  const efficiencyLevel = efficiency >= 80 ? 'Highly Efficient' :
                         efficiency >= 60 ? 'Efficient' :
                         efficiency >= 40 ? 'Moderate' : 'Improving'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚡ Efficiency Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-yellow-600">{efficiency}%</p>
          <p className="text-gray-600">Efficiency Score</p>
          <p className="text-lg font-semibold text-amber-600 mt-2">{efficiencyLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your achievement efficiency onchain.
        </p>
      </div>
    </div>
  )
}

