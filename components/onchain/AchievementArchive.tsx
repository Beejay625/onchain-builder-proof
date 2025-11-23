'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementArchiveProps {
  achievementId: bigint
}

export default function AchievementArchive({ achievementId }: AchievementArchiveProps) {
  const { address, isConnected } = useAccount()
  const [archiveReason, setArchiveReason] = useState('')
  const [archiveType, setArchiveType] = useState<'archive' | 'restore'>('archive')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainArchive')) {
    return null
  }

  const handleArchive = async () => {
    if (!isConnected || !address) return

    try {
      const action = archiveType === 'archive' ? 'Archive' : 'Restore'
      const content = `${action} Achievement\nAchievement: #${achievementId.toString()}${archiveReason ? `\nReason: ${archiveReason}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Archive operation failed:', error)
    }
  }

  return (
    <AppCard title="📦 Achievement Archive" subtitle="Archive and restore achievements onchain" accent="gray">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
          <select
            value={archiveType}
            onChange={(e) => setArchiveType(e.target.value as 'archive' | 'restore')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="archive">Archive</option>
            <option value="restore">Restore</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason (optional)</label>
          <textarea
            value={archiveReason}
            onChange={(e) => setArchiveReason(e.target.value)}
            placeholder="Why are you archiving/restoring?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleArchive}
          disabled={isPending || isConfirming || !isConnected}
          className={`w-full rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:bg-gray-400 ${
            archiveType === 'archive' ? 'bg-gray-600' : 'bg-green-600'
          }`}
        >
          {isPending || isConfirming ? 'Processing...' : archiveType === 'archive' ? 'Archive Achievement' : 'Restore Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ {archiveType === 'archive' ? 'Archived' : 'Restored'} onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

