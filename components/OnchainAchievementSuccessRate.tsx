'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSuccessRate() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const successRate = Math.min(100, (userPosts?.length || 0) * 8)
  const successLevel = successRate >= 80 ? 'Highly Successful' :
                      successRate >= 60 ? 'Successful' :
                      successRate >= 40 ? 'Progressing' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Success Rate</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-green-600">{successRate}%</p>
          <p className="text-gray-600">Success Rate</p>
          <p className="text-lg font-semibold text-emerald-600 mt-2">{successLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Track your achievement success rate onchain.
        </p>
      </div>
    </div>
  )
}

