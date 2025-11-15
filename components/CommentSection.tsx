'use client'

import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'
import { useState } from 'react'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface CommentSectionProps {
  postId: bigint
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { address } = useAccount()
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(false)
  const { writeContract, isPending } = useWriteContract()

  const handleAddComment = async () => {
    if (!comment.trim()) return
    
    // Post comment to blockchain
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [postId, comment],
    })
    setComment('')
  }

  return (
    <div className="border-t pt-3">
      <button
        onClick={() => setShowComments(!showComments)}
        className="text-sm text-blue-600 hover:underline mb-2"
      >
        {showComments ? 'Hide Comments' : '💬 Add Comment Onchain'}
      </button>
      
      {showComments && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment (stored onchain)..."
              className="flex-1 p-2 border rounded-lg text-sm"
            />
            <button
              onClick={handleAddComment}
              disabled={isPending || !comment.trim()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:bg-gray-400"
            >
              {isPending ? 'Posting...' : 'Post'}
            </button>
          </div>
          <p className="text-xs text-gray-500">Comments are permanently stored on blockchain</p>
        </div>
      )}
    </div>
  )
}
