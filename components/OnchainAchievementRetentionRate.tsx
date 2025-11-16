'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementRetentionRate() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const retentionRate = Math.min(100, (userPosts?.length || 0) * 5)
  const retentionLevel = retentionRate >= 80 ? 'Excellent Retention' :
                         retentionRate >= 60 ? 'Good Retention' :
                         retentionRate >= 40 ? 'Moderate Retention' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📌 Retention Rate</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{retentionRate}%</p>
          <p className="text-gray-600">Retention Rate</p>
          <p className="text-lg font-semibold text-emerald-600 mt-2">{retentionLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your achievement retention rate.
        </p>
      </div>
    </div>
  )
}

