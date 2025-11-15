'use client'

import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function OnchainAnalyticsDashboard() {
  const { data: totalPosts } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  const analytics = [
    { label: 'Total Achievements', value: totalPosts?.toString() || '0', trend: '+12%' },
    { label: 'Active Builders', value: '150', trend: '+8%' },
    { label: 'Total Likes', value: '2.5K', trend: '+15%' },
    { label: 'Total Comments', value: '890', trend: '+22%' },
  ]

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Analytics Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {analytics.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
            <div className="text-2xl font-bold text-indigo-600 mb-1">{stat.value}</div>
            <div className="text-xs text-green-600">{stat.trend}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
