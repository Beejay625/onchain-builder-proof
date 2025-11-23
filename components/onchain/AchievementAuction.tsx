'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementAuctionProps {
  achievementId: bigint
}

export default function AchievementAuction({ achievementId }: AchievementAuctionProps) {
  const { address, isConnected } = useAccount()
  const [startingBid, setStartingBid] = useState('0.1')
  const [reservePrice, setReservePrice] = useState('0.5')
  const [auctionDuration, setAuctionDuration] = useState(7)
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAuction')) {
    return null
  }

  const handleCreateAuction = async () => {
    if (!isConnected || !address || !startingBid || !reservePrice) return

    try {
      const endDate = new Date(Date.now() + auctionDuration * 24 * 60 * 60 * 1000)
      const content = `Achievement Auction\nAchievement: #${achievementId.toString()}\nStarting Bid: ${startingBid} ETH\nReserve Price: ${reservePrice} ETH\nDuration: ${auctionDuration} days\nEnds: ${endDate.toISOString()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Auction creation failed:', error)
    }
  }

  return (
    <AppCard title="🔨 Achievement Auction" subtitle="Create auction listings for achievements" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Starting Bid (ETH)</label>
          <input
            type="number"
            value={startingBid}
            onChange={(e) => setStartingBid(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reserve Price (ETH)</label>
          <input
            type="number"
            value={reservePrice}
            onChange={(e) => setReservePrice(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Auction Duration (days)</label>
          <input
            type="number"
            value={auctionDuration}
            onChange={(e) => setAuctionDuration(Number(e.target.value))}
            min={1}
            max={30}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        {balance && (
          <p className="text-xs text-gray-500">Balance: {formatEther(balance.value)} ETH</p>
        )}
        <button
          onClick={handleCreateAuction}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Auction'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Auction listing created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

