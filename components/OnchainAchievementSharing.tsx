'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSharing() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: postId ? [BigInt(postId)] : undefined,
  })

  const generateShareUrl = () => {
    if (!postId) return
    const url = `${window.location.origin}/achievement/${postId}`
    setShareUrl(url)
  }

  const shareToTwitter = () => {
    if (!shareUrl || !post) return
    const text = `Check out my onchain achievement: ${(post as any).content.substring(0, 100)}...`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Share Achievement</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={generateShareUrl}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Generate Share Link
        </button>
        {shareUrl && (
          <div className="space-y-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            />
            <button
              onClick={shareToTwitter}
              className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
            >
              Share on Twitter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

