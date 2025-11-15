'use client'

import { useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function OnchainAnalytics() {
  const { data: totalPosts } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  const { data: totalUsers } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalUsers',
  })

  const stats = [
    { label: 'Total Achievements', value: totalPosts?.toString() || '0', icon: '🏆' },
    { label: 'Total Builders', value: totalUsers?.toString() || '0', icon: '👥' },
    { label: 'Network', value: 'Base', icon: '⛓️' },
    { label: 'Contract Status', value: 'Verified', icon: '✓' },
  ]

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Onchain Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
            <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
