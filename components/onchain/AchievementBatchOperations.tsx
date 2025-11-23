'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementBatchOperationsProps {
  operationType: string
}

export default function AchievementBatchOperations({ operationType }: AchievementBatchOperationsProps) {
  const { address, isConnected } = useAccount()
  const [achievementIds, setAchievementIds] = useState('')
  const [batchData, setBatchData] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementBatchOperations')) {
    return null
  }

  const handleBatchOperation = async () => {
    if (!isConnected || !address || !achievementIds.trim()) return

    try {
      const ids = achievementIds.split(',').map(id => id.trim())
      const batchContent = `BATCH:${operationType}:${ids.join('|')}:${batchData || 'N/A'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [batchContent],
      })
    } catch (error) {
      console.error('Batch operation failed:', error)
    }
  }

  return (
    <AppCard title="📦 Batch Operations" subtitle="Execute multiple operations in one transaction" accent="stone">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Operation Type</label>
          <input
            type="text"
            value={operationType}
            readOnly
            className="w-full rounded-lg border border-gray-300 p-2 text-sm bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Achievement IDs (comma-separated)</label>
          <input
            type="text"
            value={achievementIds}
            onChange={(e) => setAchievementIds(e.target.value)}
            placeholder="1, 2, 3, 4, 5"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Batch Data (Optional)</label>
          <textarea
            value={batchData}
            onChange={(e) => setBatchData(e.target.value)}
            placeholder="Additional batch operation data..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleBatchOperation}
          disabled={isPending || isConfirming || !isConnected || !achievementIds.trim()}
          className="w-full rounded-lg bg-stone-600 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Executing Batch...' : 'Execute Batch Operation'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 text-sm text-stone-800">
            ✅ Batch operation executed onchain for {achievementIds.split(',').length} achievements
          </div>
        )}
      </div>
    </AppCard>
  )
}

