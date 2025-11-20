'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementLocking() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [lockDuration, setLockDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const lockAchievement = async () => {
    if (!address || !postId || !lockDuration) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `LOCK:${lockDuration}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔒 Achievement Locking</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Lock duration (days)"
          value={lockDuration}
          onChange={(e) => setLockDuration(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={lockAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Locking...' : 'Lock Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Achievement locked onchain!</p>}
      </div>
    </div>
  )
}

