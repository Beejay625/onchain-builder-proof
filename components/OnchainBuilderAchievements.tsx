'use client'

import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderAchievements() {
  const { address } = useAccount()
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const achievements = [
    { name: 'First Achievement', earned: (userPosts?.length || 0) >= 1 },
    { name: 'Milestone 10', earned: (userPosts?.length || 0) >= 10 },
    { name: 'Milestone 25', earned: (userPosts?.length || 0) >= 25 },
    { name: 'Milestone 50', earned: (userPosts?.length || 0) >= 50 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏆 Builder Achievements</h2>
      <div className="space-y-2">
        {achievements.map((achievement, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className={achievement.earned ? 'font-semibold' : 'text-gray-400'}>
              {achievement.name}
            </span>
            {achievement.earned && <span className="text-green-600">✓</span>}
          </div>
        ))}
        <p className="text-sm text-gray-500 mt-4">
          View all your earned achievements onchain.
        </p>
      </div>
    </div>
  )
}

