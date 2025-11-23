'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementSnapshotProps {
  achievementId: bigint
}

export default function OnchainAchievementSnapshot({ achievementId }: OnchainAchievementSnapshotProps) {
  const { address, isConnected } = useAccount()
  const [snapshotNote, setSnapshotNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const createSnapshot = async () => {
    if (!isConnected || !address) return

    try {
      const snapshotData = `SNAPSHOT:${Date.now()}:${snapshotNote || 'State captured'}:likes:${post?.likes || 0}:comments:${post?.comments || 0}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, snapshotData],
      })
    } catch (error) {
      console.error('Snapshot creation failed:', error)
    }
  }

  return (
    <AppCard title="📸 Achievement Snapshot" subtitle="Capture current state onchain" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Snapshot Note (optional)</label>
          <input
            type="text"
            value={snapshotNote}
            onChange={(e) => setSnapshotNote(e.target.value)}
            placeholder="Add a note about this snapshot..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="text-xs text-gray-500">
          Current state: {post?.likes || 0} likes, {post?.comments || 0} comments
        </div>
        <button
          onClick={createSnapshot}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Snapshot'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Snapshot created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

