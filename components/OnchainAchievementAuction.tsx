'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAuction() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [reservePrice, setReservePrice] = useState('')
  const [endTime, setEndTime] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createAuction = async () => {
    if (!address || !postId || !reservePrice || !endTime) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `AUCTION: Reserve ${reservePrice} ETH, ends ${endTime}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔨 Achievement Auction</h2>
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
          placeholder="Reserve price (ETH)"
          value={reservePrice}
          onChange={(e) => setReservePrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="datetime-local"
          placeholder="End time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createAuction}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Auction'}
        </button>
        {isSuccess && <p className="text-green-600">Auction created onchain!</p>}
      </div>
    </div>
  )
}

