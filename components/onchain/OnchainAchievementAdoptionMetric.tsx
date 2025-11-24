'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementAdoptionMetricProps {
  achievementId: bigint
}

export default function OnchainAchievementAdoptionMetric({ achievementId }: OnchainAchievementAdoptionMetricProps) {
  const { address, isConnected } = useAccount()
  const [adoptionMetric, setAdoptionMetric] = useState('')
  const [adoptionValue, setAdoptionValue] = useState('')
  const [adoptionSource, setAdoptionSource] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !adoptionMetric.trim() || !adoptionValue.trim()) return

    try {
      const payload = `ADOPTION_METRIC:metric:${adoptionMetric}:value:${adoptionValue}:source:${adoptionSource || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('📈 Adoption Metric submission failed:', error)
    }
  }

  return (
    <AppCard title="📈 Adoption Metric" subtitle="Track adoption KPIs tied to this release" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metric Name *</label>
          <input
            type="text"
            value={adoptionMetric}
            onChange={(e) => setAdoptionMetric(e.target.value)}
            placeholder="Daily active wallets"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metric Value *</label>
          <input
            type="text"
            value={adoptionValue}
            onChange={(e) => setAdoptionValue(e.target.value)}
            placeholder="1,245"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Source Link (optional)</label>
          <input
            type="text"
            value={adoptionSource}
            onChange={(e) => setAdoptionSource(e.target.value)}
            placeholder="Dune, dashboard"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !adoptionMetric.trim() || !adoptionValue.trim()}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording Adoption Metric' : 'Record Adoption Metric'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Adoption metric recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}
