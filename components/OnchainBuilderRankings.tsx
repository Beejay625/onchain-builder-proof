'use client'

import { useState, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'

interface Ranking {
  address: string
  posts: number
  reputation: number
}

export default function OnchainBuilderRankings() {
  const [rankings, setRankings] = useState<Ranking[]>([])
  const [timeframe, setTimeframe] = useState<'all' | 'week' | 'month'>('all')
  
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  useEffect(() => {
    // In a real app, this would fetch from contract events
    setRankings([
      { address: '0x1234...5678', posts: 150, reputation: 2500 },
      { address: '0xabcd...efgh', posts: 120, reputation: 2000 },
      { address: '0x9876...5432', posts: 100, reputation: 1800 },
    ])
  }, [timeframe])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏆 Builder Rankings</h2>
      <div className="mb-4">
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as any)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Time</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>
      <div className="space-y-2">
        {rankings.map((rank, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
              <span className="font-semibold">{truncateAddress(rank.address)}</span>
            </div>
            <div className="text-right">
              <p className="font-bold">{rank.posts} posts</p>
              <p className="text-sm text-gray-600">{rank.reputation} rep</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

