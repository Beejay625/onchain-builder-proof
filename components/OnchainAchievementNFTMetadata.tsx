'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementNFTMetadata() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [metadata, setMetadata] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const storeMetadata = async () => {
    if (!address || !postId || !metadata) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `NFT_METADATA:${metadata}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🖼️ NFT Metadata</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          placeholder="NFT metadata (JSON)"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={storeMetadata}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Storing...' : 'Store NFT Metadata'}
        </button>
        {isSuccess && <p className="text-green-600">Metadata stored onchain!</p>}
      </div>
    </div>
  )
}

