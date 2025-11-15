'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementMetadata() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [metadata, setMetadata] = useState('')
  
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: postId ? [BigInt(postId)] : undefined,
  })
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const updateMetadata = async () => {
    if (!address || !postId || !metadata) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `Metadata: ${metadata}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Achievement Metadata</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        {post && (
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Current Content:</p>
            <p className="font-medium">{(post as any).content}</p>
          </div>
        )}
        <textarea
          placeholder="Additional metadata (JSON format)"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg h-32 font-mono text-sm"
        />
        <button
          onClick={updateMetadata}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Updating...' : 'Update Metadata'}
        </button>
        {isSuccess && <p className="text-green-600">Metadata updated onchain!</p>}
      </div>
    </div>
  )
}

