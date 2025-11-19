'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAuctionProps {
  achievementId: bigint
}

export default function OnchainAchievementAuction({ achievementId }: OnchainAchievementAuctionProps) {
  const { address } = useAccount()
  const [startingBid, setStartingBid] = useState('')
  const [reservePrice, setReservePrice] = useState('')
  const [auctionDuration, setAuctionDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createAuction = async () => {
    if (!address || !startingBid.trim() || !auctionDuration.trim()) return
    
    const auctionData = `AUCTION: starting bid: ${startingBid} ETH${reservePrice ? ` | reserve: ${reservePrice} ETH` : ''} | duration: ${auctionDuration} days`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, auctionData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔨 Auction</h3>
      
      <input
        type="number"
        value={startingBid}
        onChange={(e) => setStartingBid(e.target.value)}
        placeholder="Starting bid (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={reservePrice}
        onChange={(e) => setReservePrice(e.target.value)}
        placeholder="Reserve price (ETH, optional)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={auctionDuration}
        onChange={(e) => setAuctionDuration(e.target.value)}
        placeholder="Auction duration (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={createAuction}
        disabled={isPending || isConfirming || !startingBid.trim() || !auctionDuration.trim()}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Auction Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Auction created onchain
        </div>
      )}
    </div>
  )
}
