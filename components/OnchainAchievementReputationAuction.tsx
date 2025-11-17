'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationAuction() {
  const { address } = useAccount()
  const [startingBid, setStartingBid] = useState('')
  const [duration, setDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createAuction = async () => {
    if (!address || !startingBid || !duration) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `AUCTION: ${startingBid} ETH for ${duration} hours`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔨 Reputation Auction</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Starting bid (ETH)"
          value={startingBid}
          onChange={(e) => setStartingBid(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Duration (hours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createAuction}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Auction'}
        </button>
        {isSuccess && <p className="text-green-600">Auction created!</p>}
      </div>
    </div>
  )
}

