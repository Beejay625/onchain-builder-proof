'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementRunbookRegistryProps {
  achievementId: bigint
}

export default function AchievementRunbookRegistry({ achievementId }: AchievementRunbookRegistryProps) {
  const { address, isConnected } = useAccount()
  const [runbookName, setRunbookName] = useState('')
  const [owner, setOwner] = useState('')
  const [lastReviewDate, setLastReviewDate] = useState('')
  const [runbookUrl, setRunbookUrl] = useState('')
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementRunbookRegistry')) {
    return null
  }

  const handleRecordRunbook = () => {
    if (!isConnected || !address || !runbookName.trim()) {
      return
    }

    const content = [
      'Runbook Registry',
      `Achievement: #${achievementId.toString()}`,
      `Runbook: ${runbookName}`,
      owner ? `Owner: ${owner}` : null,
      runbookUrl ? `URL: ${runbookUrl}` : null,
      lastReviewDate ? `Last Review: ${lastReviewDate}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [content],
    })
  }

  return (
    <AppCard
      title="📓 Runbook Registry"
      subtitle="Catalog operational runbooks with ownership and review cadence"
      accent="orange"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Runbook Name</label>
          <input
            type="text"
            value={runbookName}
            onChange={(e) => setRunbookName(e.target.value)}
            placeholder="Sev-1 rollback playbook"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Owner / Steward</label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="ops@builder.xyz"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Reviewed</label>
            <input
              type="date"
              value={lastReviewDate}
              onChange={(e) => setLastReviewDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Documentation URL</label>
          <input
            type="url"
            value={runbookUrl}
            onChange={(e) => setRunbookUrl(e.target.value)}
            placeholder="https://docs.builder.runbooks/sev-1"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordRunbook}
          disabled={isPending || isConfirming || !runbookName.trim() || !isConnected}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Runbook Onchain'}
        </button>
        {(isSuccess || error) && (
          <div
            className={`rounded-lg border p-3 text-sm ${
              isSuccess ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {isSuccess ? '✅ Runbook reference anchored onchain' : `⚠️ ${error?.message ?? 'Unable to record runbook'}`}
          </div>
        )}
      </div>
    </AppCard>
  )
}


