'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementPredictionMarketsProps {
  achievementId: bigint
}

export default function AchievementPredictionMarkets({ achievementId }: AchievementPredictionMarketsProps) {
  const { address, isConnected } = useAccount()
  const [marketQuestion, setMarketQuestion] = useState('')
  const [outcomeOptions, setOutcomeOptions] = useState('')
  const [endDate, setEndDate] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementPredictionMarkets')) {
    return null
  }

  const handleCreateMarket = async () => {
    if (!isConnected || !address || !marketQuestion.trim() || !outcomeOptions.trim() || !endDate.trim()) return

    try {
      const marketContent = `PREDICTIONMARKET:${marketQuestion}:${outcomeOptions}:${endDate}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, marketContent],
      })
    } catch (error) {
      console.error('Prediction market creation failed:', error)
    }
  }

  return (
    <AppCard title="🔮 Prediction Markets" subtitle="Create markets for achievement forecasting" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Market Question</label>
          <input
            type="text"
            value={marketQuestion}
            onChange={(e) => setMarketQuestion(e.target.value)}
            placeholder="e.g., Will this achievement reach 1000 likes?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Outcome Options (comma-separated)</label>
          <input
            type="text"
            value={outcomeOptions}
            onChange={(e) => setOutcomeOptions(e.target.value)}
            placeholder="e.g., Yes, No"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Market End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateMarket}
          disabled={isPending || isConfirming || !isConnected || !marketQuestion.trim() || !outcomeOptions.trim() || !endDate.trim()}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating Market...' : 'Create Prediction Market'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-pink-50 border border-pink-200 p-3 text-sm text-pink-800">
            ✅ Prediction market created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

