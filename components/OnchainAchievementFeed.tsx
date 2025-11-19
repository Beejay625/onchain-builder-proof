'use client'

import { useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { useState, useEffect } from 'react'

export default function OnchainAchievementFeed() {
  const [postIds, setPostIds] = useState<bigint[]>([])
  
  const { data: totalPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getTotalPosts',
  })

  useEffect(() => {
    if (totalPosts && Number(totalPosts) > 0) {
      const ids: bigint[] = []
      const count = Math.min(Number(totalPosts), 10)
      for (let i = 1; i <= count; i++) {
        ids.push(BigInt(i))
      }
      setPostIds(ids)
    }
  }, [totalPosts])

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📰 Recent Activity Feed</h3>
      
      {postIds.length > 0 ? (
        <div className="space-y-3">
          {postIds.map((postId) => (
            <FeedItem key={postId.toString()} postId={postId} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No recent activity</p>
      )}
    </div>
  )
}

function FeedItem({ postId }: { postId: bigint }) {
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [postId],
  })

  if (isLoading || !post) {
    return <div className="p-3 bg-gray-50 rounded-lg animate-pulse">Loading...</div>
  }

  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-blue-600">Achievement #{post.id.toString()}</span>
        <span className="text-xs text-gray-500">
          {new Date(Number(post.timestamp) * 1000).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm text-gray-700 line-clamp-2">{post.content}</p>
      <div className="flex gap-4 mt-2 text-xs text-gray-500">
        <span>❤️ {post.likes.toString()}</span>
        <span>💬 {post.comments.toString()}</span>
      </div>
    </div>
  )
}
