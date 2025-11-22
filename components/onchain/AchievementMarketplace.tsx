'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { parseEther, formatEther } from 'viem'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementMarketplaceProps {
  achievementId: bigint
}

export default function AchievementMarketplace({ achievementId }: AchievementMarketplaceProps) {
  const { address, isConnected } = useAccount()
  const [listingPrice, setListingPrice] = useState('0.1')
  const [listingDescription, setListingDescription] = useState('')
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementMarketplace')) {
    return null
  }

  const handleListAchievement = async () => {
    if (!isConnected || !address || !listingPrice) return

    try {
      const content = `Achievement Marketplace Listing\nAchievement: #${achievementId.toString()}\nPrice: ${listingPrice} ETH${listingDescription ? `\nDescription: ${listingDescription}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Listing failed:', error)
    }
  }

  return (
    <AppCard title="🏪 Achievement Marketplace" subtitle="List and trade achievements" accent="amber">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Listing Price (ETH)</label>
          <input
            type="number"
            value={listingPrice}
            onChange={(e) => setListingPrice(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
          {balance && (
            <p className="text-xs text-gray-500 mt-1">Balance: {formatEther(balance.value)} ETH</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <textarea
            value={listingDescription}
            onChange={(e) => setListingDescription(e.target.value)}
            placeholder="Why is this achievement valuable?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleListAchievement}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Listing...' : `List for ${listingPrice} ETH`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Achievement listed on marketplace
          </div>
        )}
      </div>
    </AppCard>
  )
}

