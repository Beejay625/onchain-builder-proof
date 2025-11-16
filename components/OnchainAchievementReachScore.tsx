'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReachScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const reachScore = (userPosts?.length || 0) * 11
  const reachLevel = reachScore >= 250 ? 'Wide Reach' :
                    reachScore >= 150 ? 'Good Reach' :
                    reachScore >= 75 ? 'Growing Reach' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📡 Reach Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-teal-600">{reachScore}</p>
          <p className="text-gray-600">Reach Score</p>
          <p className="text-lg font-semibold text-cyan-600 mt-2">{reachLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your achievement reach onchain.
        </p>
      </div>
    </div>
  )
}

