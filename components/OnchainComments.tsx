'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress, getTimeAgo } from '@/lib/utils'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface OnchainCommentsProps {
  postId: bigint
}

export default function OnchainComments({ postId }: OnchainCommentsProps) {
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState<any[]>([])

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const addComment = async () => {
    if (!commentText.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [postId, commentText],
      })
      setCommentText('')
    } catch (error) {
      console.error('Comment error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">💬 Onchain Comments</h3>
      
      <div className="mb-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-3 border border-gray-300 rounded-lg mb-2"
          rows={3}
        />
        <button
          onClick={addComment}
          disabled={isPending || !commentText.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? 'Posting...' : 'Post Comment'}
        </button>
      </div>

      <div className="space-y-3 mt-6">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-sm">{truncateAddress(comment.author)}</span>
                <span className="text-xs text-gray-500">{getTimeAgo(Number(comment.timestamp))}</span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {isSuccess && (
        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
          ✓ Comment posted onchain!
        </div>
      )}
    </div>
  )
}
