'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMerging() {
  const { address } = useAccount()
  const [postId1, setPostId1] = useState('')
  const [postId2, setPostId2] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mergeAchievements = async () => {
    if (!address || !postId1 || !postId2) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`MERGED: Achievement #${postId1} + #${postId2} combined`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔀 Achievement Merging</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="First Post ID"
          value={postId1}
          onChange={(e) => setPostId1(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Second Post ID"
          value={postId2}
          onChange={(e) => setPostId2(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={mergeAchievements}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Merging...' : 'Merge Achievements'}
        </button>
        {isSuccess && <p className="text-green-600">Achievements merged onchain!</p>}
      </div>
    </div>
  )
}

