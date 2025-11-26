'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementBudgetForecastProps {
  achievementId: bigint
}

export default function OnchainAchievementBudgetForecast({ achievementId }: OnchainAchievementBudgetForecastProps) {
  const { address, isConnected } = useAccount()
  const [forecastPeriod, setForecastPeriod] = useState('')
  const [forecastAmount, setForecastAmount] = useState('')
  const [forecastAssumptions, setForecastAssumptions] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordForecast = async () => {
    if (!isConnected || !address || !forecastPeriod.trim() || !forecastAmount.trim()) return

    try {
      const payload = `BUDGET_FORECAST:period:${forecastPeriod}:amount:${forecastAmount}:assumption:${forecastAssumptions || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Budget forecast submission failed:', error)
    }
  }

  return (
    <AppCard title="📈 Budget Forecast" subtitle="Share future budget projections" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Forecast Period *</label>
          <input
            type="text"
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e.target.value)}
            placeholder="Q3 2025"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Projected Amount *</label>
          <input
            type="text"
            value={forecastAmount}
            onChange={(e) => setForecastAmount(e.target.value)}
            placeholder="45,000 USDC"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assumptions (optional)</label>
          <textarea
            value={forecastAssumptions}
            onChange={(e) => setForecastAssumptions(e.target.value)}
            rows={3}
            placeholder="Hiring 2 eng, infra credits, etc"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordForecast}
          disabled={isPending || isConfirming || !isConnected || !forecastPeriod.trim() || !forecastAmount.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Budget Forecast'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Budget forecast recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
