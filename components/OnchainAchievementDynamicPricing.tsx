'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDynamicPricingProps {
  achievementId: bigint
}

export default function OnchainAchievementDynamicPricing({ achievementId }: OnchainAchievementDynamicPricingProps) {
  const { address } = useAccount()
  const [basePrice, setBasePrice] = useState('100')
  const [demandMultiplier, setDemandMultiplier] = useState('1.2x')
  const [currentPrice, setCurrentPrice] = useState('120')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordPricing = () => {
    if (!address || !basePrice.trim()) return

    const payload = `DYNAMIC_PRICING|base:${basePrice}|multiplier:${demandMultiplier}|current:${currentPrice}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-orange-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">💰 Dynamic Pricing</h3>
      <p className="text-sm text-gray-600 mb-4">Record market-based pricing adjustments for achievement access.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input value={basePrice} onChange={(e) => setBasePrice(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Base price" />
        <input value={demandMultiplier} onChange={(e) => setDemandMultiplier(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Multiplier" />
        <input value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Current price" />
      </div>

      <button
        onClick={recordPricing}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record dynamic pricing'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
          ✓ Dynamic pricing snapshot stored.
        </div>
      )}
    </section>
  )
}
