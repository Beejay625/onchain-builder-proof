'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementDataRetentionProps {
  achievementId: bigint
}

export default function OnchainAchievementDataRetention({ achievementId }: OnchainAchievementDataRetentionProps) {
  const { address, isConnected } = useAccount()
  const [datasetName, setDatasetName] = useState('')
  const [retentionAction, setRetentionAction] = useState<'retained' | 'purged' | 'anonymized'>('retained')
  const [retentionDetail, setRetentionDetail] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logRetention = async () => {
    if (!isConnected || !address || !datasetName.trim()) return

    try {
      const payload = `DATA_RETENTION:dataset:${datasetName}:action:${retentionAction}:detail:${retentionDetail || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Data retention logging failed:', error)
    }
  }

  return (
    <AppCard title="🗂️ Data Retention" subtitle="Record retention or deletion events" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dataset *</label>
          <input
            type="text"
            value={datasetName}
            onChange={(e) => setDatasetName(e.target.value)}
            placeholder="Usage logs, analytics, support transcripts"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
          <select
            value={retentionAction}
            onChange={(e) => setRetentionAction(e.target.value as typeof retentionAction)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="retained">Retained</option>
            <option value="purged">Purged</option>
            <option value="anonymized">Anonymized</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Detail (optional)</label>
          <textarea
            value={retentionDetail}
            onChange={(e) => setRetentionDetail(e.target.value)}
            rows={3}
            placeholder="Per GDPR schedule, hashed user IDs"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={logRetention}
          disabled={isPending || isConfirming || !isConnected || !datasetName.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Data Retention'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Data retention event recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
