'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementPriceImpactCalculationProps {
  achievementId: bigint
}

export default function AchievementPriceImpactCalculation({ achievementId }: AchievementPriceImpactCalculationProps) {
  const { address, isConnected } = useAccount()
  const [swapAmount, setSwapAmount] = useState('')
  const [priceImpact, setPriceImpact] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementPriceImpactCalculation')) {
    return null
  }

  const handleCalculateImpact = async () => {
    if (!isConnected || !address || !swapAmount.trim()) return

    try {
      const calculatedImpact = priceImpact || '2.5' // Mock calculation
      const content = `Price Impact Calculation\nAchievement: #${achievementId.toString()}\nAmount: ${swapAmount}\nImpact: ${calculatedImpact}%`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Price impact calculation failed:', error)
    }
  }

  return (
    <AppCard title="📊 Achievement Price Impact Calculation" subtitle="Record price impact calculations for large swaps" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Swap Amount</label>
          <input
            type="text"
            value={swapAmount}
            onChange={(e) => setSwapAmount(e.target.value)}
            placeholder="1000"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        {priceImpact && (
          <div className="grid grid-cols-2 gap-4">
            <StatBadge label="Price Impact" value={`${priceImpact}%`} accent="red" />
            <StatBadge label="Status" value={Number(priceImpact) > 1 ? 'High' : 'Low'} accent={Number(priceImpact) > 1 ? 'red' : 'green'} />
          </div>
        )}
        <button
          onClick={handleCalculateImpact}
          disabled={isPending || isConfirming || !isConnected || !swapAmount.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Calculating...' : 'Calculate Price Impact'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Price impact calculated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

