'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementResale() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [resalePrice, setResalePrice] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const listForResale = async () => {
    if (!address || !postId || !resalePrice) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `RESALE: ${resalePrice} ETH`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔄 Achievement Resale</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          step="0.001"
          placeholder="Resale price (ETH)"
          value={resalePrice}
          onChange={(e) => setResalePrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={listForResale}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Listing...' : 'List for Resale'}
        </button>
        {isSuccess && <p className="text-green-600">Resale listing created onchain!</p>}
      </div>
    </div>
  )
}

