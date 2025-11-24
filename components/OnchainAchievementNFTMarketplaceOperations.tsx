'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementNFTMarketplaceOperationsProps {
  achievementId: bigint
}

export default function OnchainAchievementNFTMarketplaceOperations({ achievementId }: OnchainAchievementNFTMarketplaceOperationsProps) {
  const { address } = useAccount()
  const [marketplaceAddress, setMarketplaceAddress] = useState('0xmarketplace')
  const [nftAddress, setNftAddress] = useState('0xnft')
  const [tokenId, setTokenId] = useState('1')
  const [price, setPrice] = useState('1.0 ETH')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordMarketplace = () => {
    if (!address) return
    if (!marketplaceAddress.trim()) return
    if (!nftAddress.trim() || !nftAddress.startsWith('0x')) return
    if (!marketplaceAddress.startsWith('0x') || marketplaceAddress.length !== 42) return

    const payload = `NFT_MARKETPLACE_OPERATIONS|marketplace:${marketplaceAddress}|nft:${nftAddress}|tokenId:${tokenId}|price:${price}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-violet-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🛒 NFT Marketplace Operations</h3>
      <p className="text-sm text-gray-600 mb-4">Record NFT marketplace listings, sales and operations.</p>

      <div className="space-y-3 mb-4">
        <input value={marketplaceAddress} onChange={(e) => setMarketplaceAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-500" placeholder="Marketplace address" />
        <input value={nftAddress} onChange={(e) => setNftAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="NFT address" />
        <input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token ID" min="0" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Price" />
      </div>

      <button
        onClick={recordMarketplace}
        disabled={isPending || isConfirming || !address || !marketplaceAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record marketplace operation'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-violet-700 bg-violet-50 border border-violet-200 rounded-lg p-3">
          ✓ NFT marketplace operation recorded onchain.
        </div>
      )}
    </section>
  )
}
