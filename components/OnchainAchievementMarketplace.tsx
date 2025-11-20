'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMarketplaceProps {
  achievementId: bigint
}

export default function OnchainAchievementMarketplace({ achievementId }: OnchainAchievementMarketplaceProps) {
  const { address } = useAccount()
  const [listingPrice, setListingPrice] = useState('')
  const [marketplaceType, setMarketplaceType] = useState('achievement')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const listOnMarketplace = async () => {
    if (!address || !listingPrice.trim()) return
    
    const marketplaceData = `MARKETPLACE_LISTING: ${marketplaceType} | price: ${listingPrice} ETH`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, marketplaceData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏪 Marketplace Listing</h3>
      
      <select
        value={marketplaceType}
        onChange={(e) => setMarketplaceType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="achievement">Achievement Marketplace</option>
        <option value="nft">NFT Marketplace</option>
        <option value="skill">Skill Marketplace</option>
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
        onClick={listOnMarketplace}
        disabled={isPending || isConfirming || !listingPrice.trim()}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Listing...' : 'List on Marketplace Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Listed on marketplace onchain
        </div>
      )}
    </div>
  )
}
