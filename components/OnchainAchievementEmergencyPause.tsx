'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementEmergencyPause() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [reason, setReason] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const triggerPause = () => {
    if (!address || !postId || !reason) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `PAUSE:${reason}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🛑 Emergency Pause</h2>
      <p className="text-gray-600 mb-4">
        Freeze achievement interactions during investigations or maintenance windows.
      </p>
      <input
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Achievement ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />
      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows={3}
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <button
        onClick={triggerPause}
        disabled={isPending || isConfirming}
        className="w-full bg-red-600 text-white rounded-lg py-2 hover:bg-red-700 disabled:opacity-50"
      >
        {isPending || isConfirming ? 'Pausing...' : 'Initiate Pause'}
      </button>
      {isSuccess && <p className="text-green-600 mt-4">Pause signal recorded onchain.</p>}
    </div>
  )
}
