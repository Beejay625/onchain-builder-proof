'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBadgesProps {
  userAddress: `0x${string}`
}

export default function OnchainAchievementBadges({ userAddress }: OnchainAchievementBadgesProps) {
  const { data: userPosts, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: [userAddress],
  })

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">Loading badges...</div>
      </div>
    )
  }

  if (!userPosts || userPosts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">🏅 Onchain Achievement Badges</h3>
        <p className="text-gray-600">No badges unlocked yet</p>
      </div>
    )
  }

  const achievementCount = userPosts.length
  const badges = []
  
  if (achievementCount >= 1) badges.push({ name: 'First Step', icon: '🥉' })
  if (achievementCount >= 5) badges.push({ name: 'Builder', icon: '🥈' })
  if (achievementCount >= 10) badges.push({ name: 'Veteran', icon: '🥇' })
  if (achievementCount >= 25) badges.push({ name: 'Expert', icon: '💎' })
  if (achievementCount >= 50) badges.push({ name: 'Master', icon: '👑' })
  if (achievementCount >= 100) badges.push({ name: 'Legend', icon: '🌟' })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏅 Onchain Achievement Badges</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge, index) => (
          <div key={index} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300 text-center">
            <div className="text-4xl mb-2">{badge.icon}</div>
            <div className="font-semibold text-sm">{badge.name}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
        Total achievements: {achievementCount}
      </div>
    </div>
  )
}
