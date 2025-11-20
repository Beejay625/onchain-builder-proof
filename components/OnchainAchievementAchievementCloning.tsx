'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementCloning() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [modifications, setModifications] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const cloneAchievement = async () => {
    if (!address || !postId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`CLONE:${postId}:${modifications}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Achievement Cloning</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Source achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Modifications (optional)"
          value={modifications}
          onChange={(e) => setModifications(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={cloneAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Cloning...' : 'Clone Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Achievement cloned!</p>}
      </div>
    </div>
  )
}

