'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementPriority() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [priority, setPriority] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const setPriority = async () => {
    if (!address || !postId || !priority) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `PRIORITY:${priority}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⭐ Achievement Priority</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <button
          onClick={setPriority}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Priority'}
        </button>
        {isSuccess && <p className="text-green-600">Priority set onchain!</p>}
      </div>
    </div>
  )
}

