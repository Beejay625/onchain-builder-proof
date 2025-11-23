'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementMergingProps {
  achievementId: bigint
}

export default function OnchainAchievementMerging({ achievementId }: OnchainAchievementMergingProps) {
  const { address, isConnected } = useAccount()
  const [mergeTargets, setMergeTargets] = useState('')
  const [mergeStrategy, setMergeStrategy] = useState<'combine' | 'replace' | 'append'>('combine')
  const [mergeNote, setMergeNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const mergeAchievements = async () => {
    if (!isConnected || !address || !mergeTargets.trim()) return

    try {
      const mergeData = `MERGE:targets:${mergeTargets}:strategy:${mergeStrategy}:note:${mergeNote || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, mergeData],
      })
    } catch (error) {
      console.error('Merging failed:', error)
    }
  }

  return (
    <AppCard title="🔀 Achievement Merging" subtitle="Merge multiple achievements together" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Achievement IDs *</label>
          <input
            type="text"
            value={mergeTargets}
            onChange={(e) => setMergeTargets(e.target.value)}
            placeholder="Comma-separated: 1,2,3"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Merge Strategy</label>
          <select
            value={mergeStrategy}
            onChange={(e) => setMergeStrategy(e.target.value as typeof mergeStrategy)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="combine">Combine</option>
            <option value="replace">Replace</option>
            <option value="append">Append</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Merge Note (optional)</label>
          <input
            type="text"
            value={mergeNote}
            onChange={(e) => setMergeNote(e.target.value)}
            placeholder="Why are you merging?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={mergeAchievements}
          disabled={isPending || isConfirming || !isConnected || !mergeTargets.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Merging...' : 'Merge Achievements'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Merge recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

