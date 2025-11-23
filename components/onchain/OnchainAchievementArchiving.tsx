'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementArchivingProps {
  achievementId: bigint
}

export default function OnchainAchievementArchiving({ achievementId }: OnchainAchievementArchivingProps) {
  const { address, isConnected } = useAccount()
  const [archiveReason, setArchiveReason] = useState('')
  const [archiveCategory, setArchiveCategory] = useState<'completed' | 'deprecated' | 'superseded' | 'other'>('completed')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const archiveAchievement = async () => {
    if (!isConnected || !address || !archiveReason.trim()) return

    try {
      const archiveData = `ARCHIVE:category:${archiveCategory}:reason:${archiveReason}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, archiveData],
      })
    } catch (error) {
      console.error('Archiving failed:', error)
    }
  }

  const unarchiveAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const unarchiveData = `UNARCHIVE:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, unarchiveData],
      })
    } catch (error) {
      console.error('Unarchiving failed:', error)
    }
  }

  return (
    <AppCard title="📦 Achievement Archiving" subtitle="Archive or restore achievements" accent="gray">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Archive Category</label>
          <select
            value={archiveCategory}
            onChange={(e) => setArchiveCategory(e.target.value as typeof archiveCategory)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="completed">Completed</option>
            <option value="deprecated">Deprecated</option>
            <option value="superseded">Superseded</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Archive Reason *</label>
          <textarea
            value={archiveReason}
            onChange={(e) => setArchiveReason(e.target.value)}
            placeholder="Why are you archiving?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={archiveAchievement}
            disabled={isPending || isConfirming || !isConnected || !archiveReason.trim()}
            className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
          >
            {isPending || isConfirming ? 'Archiving...' : 'Archive'}
          </button>
          <button
            onClick={unarchiveAchievement}
            disabled={isPending || isConfirming || !isConnected}
            className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            Unarchive
          </button>
        </div>
        {isConfirmed && (
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm text-gray-800">
            ✅ Archive status updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

