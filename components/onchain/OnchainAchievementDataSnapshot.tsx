'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementDataSnapshotProps {
  achievementId: bigint
}

export default function OnchainAchievementDataSnapshot({ achievementId }: OnchainAchievementDataSnapshotProps) {
  const { address, isConnected } = useAccount()
  const [snapshotLabel, setSnapshotLabel] = useState('')
  const [snapshotHash, setSnapshotHash] = useState('')
  const [snapshotLocation, setSnapshotLocation] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const anchorSnapshot = async () => {
    if (!isConnected || !address || !snapshotLabel.trim() || !snapshotHash.trim()) return

    try {
      const payload = `DATA_SNAPSHOT:label:${snapshotLabel}:hash:${snapshotHash}:location:${snapshotLocation || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Data snapshot anchor failed:', error)
    }
  }

  return (
    <AppCard title="🗃️ Data Snapshot" subtitle="Hash and anchor important datasets" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Snapshot Label *</label>
          <input
            type="text"
            value={snapshotLabel}
            onChange={(e) => setSnapshotLabel(e.target.value)}
            placeholder="Leaderboard export 2025-02-01"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Snapshot Hash *</label>
          <input
            type="text"
            value={snapshotHash}
            onChange={(e) => setSnapshotHash(e.target.value)}
            placeholder="0xabc..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Storage Location (optional)</label>
          <input
            type="text"
            value={snapshotLocation}
            onChange={(e) => setSnapshotLocation(e.target.value)}
            placeholder="ipfs://, s3://, etc"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={anchorSnapshot}
          disabled={isPending || isConfirming || !isConnected || !snapshotLabel.trim() || !snapshotHash.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Anchoring...' : 'Anchor Data Snapshot'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Data snapshot anchored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
