'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementDynamicPricingProps {
  achievementId: bigint
}

export default function AchievementDynamicPricing({ achievementId }: AchievementDynamicPricingProps) {
  const { address, isConnected } = useAccount()
  const [basePrice, setBasePrice] = useState('')
  const [pricingModel, setPricingModel] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementDynamicPricing')) {
    return null
  }

  const handleSetupPricing = async () => {
    if (!isConnected || !address || !basePrice.trim() || !pricingModel.trim()) return

    try {
      const pricingContent = `DYNAMICPRICE:${basePrice}:${pricingModel}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, pricingContent],
      })
    } catch (error) {
      console.error('Dynamic pricing setup failed:', error)
    }
  }

  return (
    <AppCard title="💲 Dynamic Pricing" subtitle="Market-based dynamic pricing system" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (ETH)</label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            placeholder="e.g., 0.1"
            step="0.001"
            min="0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Model</label>
          <select
            value={pricingModel}
            onChange={(e) => setPricingModel(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="">Select model...</option>
            <option value="demand_based">Demand-Based</option>
            <option value="time_decay">Time Decay</option>
            <option value="volume_discount">Volume Discount</option>
            <option value="auction">Auction</option>
            <option value="bonding_curve">Bonding Curve</option>
          </select>
        </div>
        <button
          onClick={handleSetupPricing}
          disabled={isPending || isConfirming || !isConnected || !basePrice.trim() || !pricingModel.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Dynamic Pricing'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Dynamic pricing configured onchain: {pricingModel} model with base price {basePrice} ETH
          </div>
        )}
      </div>
    </AppCard>
  )
}

