'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRoyaltyPaymentsProps {
  achievementId: bigint
}

export default function OnchainAchievementRoyaltyPayments({ achievementId }: OnchainAchievementRoyaltyPaymentsProps) {
  const { address } = useAccount()
  const [nftAddress, setNftAddress] = useState('0xnft')
  const [tokenId, setTokenId] = useState('1')
  const [royaltyAmount, setRoyaltyAmount] = useState('0.05')
  const [recipient, setRecipient] = useState('0xrecipient')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordRoyalty = () => {
    if (!address) return
    if (!nftAddress.trim()) return
    if (!nftAddress.startsWith('0x') || nftAddress.length !== 42) return

    const payload = `ROYALTY_PAYMENTS|nft:${nftAddress}|tokenId:${tokenId}|amount:${royaltyAmount}|recipient:${recipient}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-violet-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💎 Royalty Payments</h3>
      <p className="text-sm text-gray-600 mb-4">Record NFT royalty payment distributions and recipients.</p>

      <div className="space-y-3 mb-4">
        <input value={nftAddress} onChange={(e) => setNftAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-violet-500" placeholder="NFT address" />
        <input type="number" value={tokenId} onChange={(e) => setTokenId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Token ID" min="0" />
        <input value={royaltyAmount} onChange={(e) => setRoyaltyAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Royalty amount" />
        <input value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Recipient address" />
      </div>

      <button
        onClick={recordRoyalty}
        disabled={isPending || isConfirming || !address || !nftAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record royalty payment'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-violet-700 bg-violet-50 border border-violet-200 rounded-lg p-3">
          ✓ Royalty payment recorded onchain.
        </div>
      )}
    </section>
  )
}
