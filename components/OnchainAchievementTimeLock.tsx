'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementTimeLock() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [unlockDate, setUnlockDate] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createTimeLock = async () => {
    if (!address || !postId || !unlockDate) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `TIME_LOCK: Unlocks on ${unlockDate}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏳ Achievement Time Lock</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="datetime-local"
          placeholder="Unlock date"
          value={unlockDate}
          onChange={(e) => setUnlockDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createTimeLock}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Locking...' : 'Create Time Lock'}
        </button>
        {isSuccess && <p className="text-green-600">Time lock created onchain!</p>}
      </div>
    </div>
  )
}

