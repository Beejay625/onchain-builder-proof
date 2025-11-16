'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementValueScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const valueScore = (userPosts?.length || 0) * 9
  const valueLevel = valueScore >= 200 ? 'High Value' :
                    valueScore >= 100 ? 'Moderate Value' :
                    valueScore >= 50 ? 'Growing Value' : 'Building'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💎 Value Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-purple-600">{valueScore}</p>
          <p className="text-gray-600">Value Score</p>
          <p className="text-lg font-semibold text-indigo-600 mt-2">{valueLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure the value of your achievements onchain.
        </p>
      </div>
    </div>
  )
}

