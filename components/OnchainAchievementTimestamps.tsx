'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { formatTimestamp } from '@/lib/utils'

export default function OnchainAchievementTimestamps() {
  const { address } = useAccount()
  const [selectedPost, setSelectedPost] = useState('')
  const [timestamp, setTimestamp] = useState<string>('')
  
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: selectedPost ? [BigInt(selectedPost)] : undefined,
  })

  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
  })

  useEffect(() => {
    if (post) {
      setTimestamp(formatTimestamp((post as any).timestamp))
    }
  }, [post])

  const posts = userPosts ? Array.from(userPosts as bigint[]) : []

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏰ Achievement Timestamps</h2>
      <div className="space-y-4">
        <select
          value={selectedPost}
          onChange={(e) => setSelectedPost(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select achievement</option>
          {posts.map((postId) => (
            <option key={postId.toString()} value={postId.toString()}>
              Achievement #{postId.toString()}
            </option>
          ))}
        </select>
        {timestamp && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Onchain Timestamp</p>
            <p className="text-lg font-semibold">{timestamp}</p>
            <p className="text-xs text-gray-500 mt-2">This timestamp is permanently recorded on the blockchain</p>
          </div>
        )}
      </div>
    </div>
  )
}

