'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementImpactMeasurementProps {
  achievementId: bigint
}

export default function AchievementImpactMeasurement({ achievementId }: AchievementImpactMeasurementProps) {
  const { address, isConnected } = useAccount()
  const [metricName, setMetricName] = useState('')
  const [metricValue, setMetricValue] = useState('')
  const [evidenceLink, setEvidenceLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementImpactMeasurement')) {
    return null
  }

  const handleRecordImpact = async () => {
    if (!isConnected || !address || !metricName.trim() || !metricValue.trim()) return

    try {
      const impactContent = `IMPACT:${metricName}:${metricValue}:${evidenceLink || 'N/A'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, impactContent],
      })
    } catch (error) {
      console.error('Impact measurement failed:', error)
    }
  }

  return (
    <AppCard title="📊 Impact Measurement" subtitle="Track real-world impact and metrics" accent="teal">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metric Name</label>
          <input
            type="text"
            value={metricName}
            onChange={(e) => setMetricName(e.target.value)}
            placeholder="e.g., Users Reached, Revenue Generated"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metric Value</label>
          <input
            type="text"
            value={metricValue}
            onChange={(e) => setMetricValue(e.target.value)}
            placeholder="e.g., 1000, $5000"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Link (Optional)</label>
          <input
            type="url"
            value={evidenceLink}
            onChange={(e) => setEvidenceLink(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordImpact}
          disabled={isPending || isConfirming || !isConnected || !metricName.trim() || !metricValue.trim()}
          className="w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording Impact...' : 'Record Impact Metric'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-teal-50 border border-teal-200 p-3 text-sm text-teal-800">
            ✅ Impact metric recorded onchain: {metricName} = {metricValue}
          </div>
        )}
      </div>
    </AppCard>
  )
}

