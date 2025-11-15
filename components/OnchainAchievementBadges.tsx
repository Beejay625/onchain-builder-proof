'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

interface Badge {
  id: string
  name: string
  description: string
  unlocked: boolean
}

export default function OnchainAchievementBadges() {
  const { address } = useAccount()
  const [badges, setBadges] = useState<Badge[]>([])
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
  })

  useEffect(() => {
    if (userPosts) {
      const postCount = Array.from(userPosts as bigint[]).length
      const availableBadges: Badge[] = [
        { id: '1', name: 'First Steps', description: 'Mint your first achievement', unlocked: postCount >= 1 },
        { id: '2', name: 'Getting Started', description: 'Mint 5 achievements', unlocked: postCount >= 5 },
        { id: '3', name: 'Builder', description: 'Mint 10 achievements', unlocked: postCount >= 10 },
        { id: '4', name: 'Expert', description: 'Mint 25 achievements', unlocked: postCount >= 25 },
        { id: '5', name: 'Master', description: 'Mint 50 achievements', unlocked: postCount >= 50 },
        { id: '6', name: 'Legend', description: 'Mint 100 achievements', unlocked: postCount >= 100 },
      ]
      setBadges(availableBadges)
    }
  }, [userPosts])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏅 Achievement Badges</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-lg border-2 ${
              badge.unlocked
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-200 bg-gray-50 opacity-50'
            }`}
          >
            <div className="text-3xl mb-2">{badge.unlocked ? '🏆' : '🔒'}</div>
            <h3 className="font-semibold">{badge.name}</h3>
            <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

