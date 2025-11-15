'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { formatTimestamp } from '@/lib/utils'

export default function OnchainAchievementHistory() {
  const { address } = useAccount()
  const [history, setHistory] = useState<any[]>([])
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
  })

  useEffect(() => {
    const loadHistory = async () => {
      if (!userPosts) return
      const posts = Array.from(userPosts as bigint[])
      const historyItems = await Promise.all(
        posts.slice(0, 10).map(async (postId) => {
          // In real app, fetch post details
          return {
            id: postId.toString(),
            timestamp: Date.now() / 1000 - Math.random() * 86400 * 30,
          }
        })
      )
      setHistory(historyItems.sort((a, b) => b.timestamp - a.timestamp))
    }
    loadHistory()
  }, [userPosts])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📜 Achievement History</h2>
      <div className="space-y-2">
        {history.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No history found</p>
        ) : (
          history.map((item) => (
            <div key={item.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <span className="font-medium">Achievement #{item.id}</span>
              <span className="text-sm text-gray-600">{formatTimestamp(BigInt(Math.floor(item.timestamp)))}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

