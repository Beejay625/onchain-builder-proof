'use client'

import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface AchievementStatsProps {
  achievementId: bigint
}

export default function AchievementStats({ achievementId }: AchievementStatsProps) {
  const { data: post } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  if (!post) return null

  const stats = [
    { label: 'Likes', value: post.likes.toString(), icon: '❤️' },
    { label: 'Comments', value: post.comments.toString(), icon: '💬' },
    { label: 'Views', value: '0', icon: '👁️' },
    { label: 'Shares', value: '0', icon: '🔗' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
