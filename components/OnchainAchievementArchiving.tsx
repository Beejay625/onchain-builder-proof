'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementArchiving() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const archiveAchievement = async () => {
    if (!address || !postId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), 'ARCHIVE: Archived'],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Achievement Archiving</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID to archive"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={archiveAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Archiving...' : 'Archive Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Archived onchain!</p>}
      </div>
    </div>
  )
}
