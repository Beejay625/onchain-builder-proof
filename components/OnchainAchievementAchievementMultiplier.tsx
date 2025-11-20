'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementMultiplier() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [multiplier, setMultiplier] = useState('')
  const [reason, setReason] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const applyMultiplier = async () => {
    if (!address || !postId || !multiplier) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `MULTIPLIER:${multiplier}:${reason}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✨ Achievement Multiplier</h2>
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
          placeholder="Multiplier (e.g. 1.2)"
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Reason for multiplier"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={applyMultiplier}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Applying...' : 'Apply Multiplier'}
        </button>
        {isSuccess && <p className="text-green-600">Multiplier applied onchain!</p>}
      </div>
    </div>
  )
}
