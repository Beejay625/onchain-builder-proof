'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMarketplaceProps {
  achievementId: bigint
}

export default function OnchainAchievementMarketplace({ achievementId }: OnchainAchievementMarketplaceProps) {
  const { address } = useAccount()
  const [listingPrice, setListingPrice] = useState('')
  const [listingType, setListingType] = useState<'sale' | 'auction'>('sale')
  
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const listAchievement = async () => {
    if (!address || !listingPrice) return
    
    const marketplaceData = `MARKETPLACE_LISTING: ${listingType} - Price: ${listingPrice} ETH`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, marketplaceData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏪 Onchain Achievement Marketplace</h3>
      
      <select
        value={listingType}
        onChange={(e) => setListingType(e.target.value as 'sale' | 'auction')}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="sale">Direct Sale</option>
        <option value="auction">Auction</option>
      </select>
      
      <input
        type="number"
        value={listingPrice}
        onChange={(e) => setListingPrice(e.target.value)}
        placeholder="Listing price (ETH)"
        step="0.001"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={listAchievement}
        disabled={isPending || isConfirming || !listingPrice || parseFloat(listingPrice) <= 0}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Listing...' : `List for ${listingPrice || '0'} ETH`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievement listed on marketplace
        </div>
      )}
    </div>
  )
}
