'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCollaborativeNotes() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [note, setNote] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const shareNote = () => {
    if (!address || !postId || !note.trim()) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `CO_NOTE:${note}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Collaborative Notes</h2>
      <p className="text-gray-600 mb-4">
        Capture shared learnings and feedback directly onchain.
      </p>
      <input
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Achievement ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />
      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows={4}
        placeholder="Drop collaborative notes"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        onClick={shareNote}
        disabled={isPending || isConfirming}
        className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
      >
        {isPending || isConfirming ? 'Sharing...' : 'Share Note Onchain'}
      </button>
      {isSuccess && <p className="text-green-600 mt-4">Note pinned to the achievement.</p>}
    </div>
  )
}
