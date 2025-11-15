'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementLinking() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [linkedPostId, setLinkedPostId] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const linkAchievements = async () => {
    if (!address || !postId || !linkedPostId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `LINKED_TO: #${linkedPostId}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Achievement Linking</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Source Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Linked Post ID"
          value={linkedPostId}
          onChange={(e) => setLinkedPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={linkAchievements}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Linking...' : 'Link Achievements'}
        </button>
        {isSuccess && <p className="text-green-600">Achievements linked onchain!</p>}
      </div>
    </div>
  )
}

