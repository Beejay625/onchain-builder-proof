'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementBulkOperations() {
  const { address, isConnected } = useAccount()
  const [operation, setOperation] = useState<'archive' | 'delete' | 'export' | 'tag'>('archive')
  const [selectedIds, setSelectedIds] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementBulkOperations')) {
    return null
  }

  const handleBulkOperation = async () => {
    if (!isConnected || !address || !selectedIds.trim()) return

    try {
      const content = `Bulk Operation\nOperation: ${operation}\nAchievements: ${selectedIds}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Bulk operation failed:', error)
    }
  }

  return (
    <AppCard title="📦 Achievement Bulk Operations" subtitle="Perform operations on multiple achievements" accent="gray">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as 'archive' | 'delete' | 'export' | 'tag')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="archive">Archive</option>
            <option value="delete">Delete</option>
            <option value="export">Export</option>
            <option value="tag">Tag</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Achievement IDs (comma-separated)</label>
          <textarea
            value={selectedIds}
            onChange={(e) => setSelectedIds(e.target.value)}
            placeholder="1, 2, 3"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleBulkOperation}
          disabled={isPending || isConfirming || !isConnected || !selectedIds.trim()}
          className="w-full rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : `Perform ${operation}`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Bulk operation completed onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

