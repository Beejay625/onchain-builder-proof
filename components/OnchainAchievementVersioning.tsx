'use client'

import { useState } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementVersioning() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [version, setVersion] = useState('')
  
  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: postId ? [BigInt(postId)] : undefined,
  })
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createVersion = async () => {
    if (!address || !postId || !version) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `VERSION: ${version}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📋 Achievement Versioning</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Version (e.g., v1.2.0)"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createVersion}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Versioning...' : 'Create Version'}
        </button>
        {isSuccess && <p className="text-green-600">Version created onchain!</p>}
      </div>
    </div>
  )
}

