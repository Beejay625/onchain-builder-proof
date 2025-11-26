'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementUsageAnalyticsProps {
  achievementId: bigint
}

export default function OnchainAchievementUsageAnalytics({ achievementId }: OnchainAchievementUsageAnalyticsProps) {
  const { address, isConnected } = useAccount()
  const [metricName, setMetricName] = useState('')
  const [metricValue, setMetricValue] = useState('')
  const [timeWindow, setTimeWindow] = useState('daily')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logUsage = async () => {
    if (!isConnected || !address || !metricName.trim() || !metricValue.trim()) return

    try {
      const payload = `USAGE_ANALYTICS:metric:${metricName}:value:${metricValue}:window:${timeWindow}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Usage analytics submission failed:', error)
    }
  }

  return (
    <AppCard title="📊 Usage Analytics" subtitle="Record usage metric snapshots" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metric Name *</label>
          <input
            type="text"
            value={metricName}
            onChange={(e) => setMetricName(e.target.value)}
            placeholder="Active wallets, daily mints, TVL"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metric Value *</label>
          <input
            type="text"
            value={metricValue}
            onChange={(e) => setMetricValue(e.target.value)}
            placeholder="1,245"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Window</label>
          <select
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>
        <button
          onClick={logUsage}
          disabled={isPending || isConfirming || !isConnected || !metricName.trim() || !metricValue.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Usage Snapshot'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Usage analytics recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
