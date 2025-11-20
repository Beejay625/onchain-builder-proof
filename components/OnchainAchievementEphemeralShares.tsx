'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementEphemeralShares() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [expiryMinutes, setExpiryMinutes] = useState('15')
  const [viewer, setViewer] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mintEphemeralLink = () => {
    if (!address || !postId || !viewer) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [
        BigInt(postId),
        `EPHEMERAL:${viewer}:${expiryMinutes}`,
      ],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏱️ Ephemeral Shares</h2>
      <p className="text-gray-600 mb-4">
        Grant temporary viewing rights for sensitive achievements.
      </p>
      <div className="space-y-4">
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Viewer address"
          value={viewer}
          onChange={(e) => setViewer(e.target.value)}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Expires in minutes"
          type="number"
          min="1"
          value={expiryMinutes}
          onChange={(e) => setExpiryMinutes(e.target.value)}
        />
        <button
          onClick={mintEphemeralLink}
          disabled={isPending || isConfirming}
          className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Granting...' : 'Grant Ephemeral Access'}
        </button>
        {isSuccess && <p className="text-green-600">Ephemeral pass minted successfully.</p>}
      </div>
    </div>
  )
}
