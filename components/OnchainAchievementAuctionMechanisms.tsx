'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAuctionMechanismsProps {
  achievementId: bigint
}

export default function OnchainAchievementAuctionMechanisms({ achievementId }: OnchainAchievementAuctionMechanismsProps) {
  const { address } = useAccount()
  const [marketplaceAddress, setMarketplaceAddress] = useState('0xmarketplace')
  const [nftAddress, setNftAddress] = useState('0xnft')
  const [price, setPrice] = useState('1.0 ETH')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!marketplaceAddress.trim()) return
    if (!marketplaceAddress.startsWith('0x') || marketplaceAddress.length !== 42) return
    const payload = `AuctionMechanisms|marketplace:${marketplaceAddress}|nft:${nftAddress}|price:${price}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">AuctionMechanisms</h3>
      <p className="text-sm text-gray-600 mb-4">Track AuctionMechanisms operations and marketplace interactions.</p>
      <div className="space-y-3 mb-4">
        <input value={marketplaceAddress} onChange={(e) => setMarketplaceAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Marketplace address" />
        <input value={nftAddress} onChange={(e) => setNftAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="NFT address" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Price" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !marketplaceAddress.startsWith('0x')} className="w-full px-4 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record AuctionMechanisms'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3">✓ AuctionMechanisms recorded onchain.</div>}
    </section>
  )
}
