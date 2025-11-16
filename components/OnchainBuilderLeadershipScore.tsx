'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderLeadershipScore() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const leadershipScore = (userPosts?.length || 0) * 6.5
  const leadershipLevel = leadershipScore >= 200 ? 'Leader' :
                         leadershipScore >= 150 ? 'Influencer' :
                         leadershipScore >= 100 ? 'Mentor' : 'Builder'

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">👑 Leadership Score</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-purple-600">{leadershipScore.toFixed(0)}</p>
          <p className="text-gray-600">Leadership Score</p>
          <p className="text-lg font-semibold text-indigo-600 mt-2">{leadershipLevel}</p>
        </div>
        <p className="text-sm text-gray-500">
          Measure your leadership through achievements.
        </p>
      </div>
    </div>
  )
}

