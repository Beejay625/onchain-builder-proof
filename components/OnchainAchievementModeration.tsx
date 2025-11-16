'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementModeration() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [action, setAction] = useState('approve')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const moderateAchievement = async () => {
    if (!address || !postId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `MODERATE: ${action}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚖️ Achievement Moderation</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="approve">Approve</option>
          <option value="reject">Reject</option>
        </select>
        <button
          onClick={moderateAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Moderating...' : 'Moderate'}
        </button>
        {isSuccess && <p className="text-green-600">Moderated onchain!</p>}
      </div>
    </div>
  )
}

