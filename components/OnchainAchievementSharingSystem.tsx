'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSharingSystem() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  
  const { data: userPosts } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getUserPosts',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  })

  const shareLink = postId ? `${window.location.origin}/achievement/${postId}` : ''

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Sharing System</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {shareLink && (
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">{shareLink}</p>
          </div>
        )}
        <p className="text-sm text-gray-500">
          Share achievements with verifiable onchain links
        </p>
      </div>
    </div>
  )
}

