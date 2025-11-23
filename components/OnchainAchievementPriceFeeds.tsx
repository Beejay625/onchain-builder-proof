'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPriceFeedsProps {
  achievementId: bigint
}

export default function OnchainAchievementPriceFeeds({ achievementId }: OnchainAchievementPriceFeedsProps) {
  const { address } = useAccount()
  const [feedAddress, setFeedAddress] = useState('0xfeed')
  const [pair, setPair] = useState('ETH/USD')
  const [price, setPrice] = useState('2500')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordFeed = () => {
    if (!address) return
    if (!feedAddress.trim()) return
    if (!feedAddress.startsWith('0x') || feedAddress.length !== 42) return

    const payload = `PRICE_FEEDS|feed:${feedAddress}|pair:${pair}|price:${price}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-orange-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📈 Price Feeds</h3>
      <p className="text-sm text-gray-600 mb-4">Record price feed updates from oracle networks.</p>

      <div className="space-y-3 mb-4">
        <input value={feedAddress} onChange={(e) => setFeedAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500" placeholder="Feed address" />
        <input value={pair} onChange={(e) => setPair(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Trading pair" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Price" />
      </div>

      <button
        onClick={recordFeed}
        disabled={isPending || isConfirming || !address || !feedAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record price feed'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
          ✓ Price feed recorded onchain.
        </div>
      )}
    </section>
  )
}
