'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementForking() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [forkNote, setForkNote] = useState('')
  
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: postId ? [BigInt(postId)] : undefined,
  })
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const forkAchievement = async () => {
    if (!address || !postId) return
    const originalContent = post ? (post as any).content : ''
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`FORK of #${postId}: ${originalContent} | Note: ${forkNote}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🍴 Achievement Forking</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Original Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="Fork note (optional)"
          value={forkNote}
          onChange={(e) => setForkNote(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg h-20"
        />
        <button
          onClick={forkAchievement}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Forking...' : 'Fork Achievement'}
        </button>
        {isSuccess && <p className="text-green-600">Achievement forked onchain!</p>}
      </div>
    </div>
  )
}

