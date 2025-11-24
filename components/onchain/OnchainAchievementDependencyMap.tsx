'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementDependencyMapProps {
  achievementId: bigint
}

export default function OnchainAchievementDependencyMap({ achievementId }: OnchainAchievementDependencyMapProps) {
  const { address, isConnected } = useAccount()
  const [dependencyName, setDependencyName] = useState('')
  const [dependencyVersion, setDependencyVersion] = useState('')
  const [dependencyNote, setDependencyNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !dependencyName.trim() || !dependencyVersion.trim()) return

    try {
      const payload = `DEPENDENCY_MAP:dependency:${dependencyName}:version:${dependencyVersion}:note:${dependencyNote || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🧩 Dependency Map submission failed:', error)
    }
  }

  return (
    <AppCard title="🧩 Dependency Map" subtitle="List upstream dependencies or versions" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dependency Name *</label>
          <input
            type="text"
            value={dependencyName}
            onChange={(e) => setDependencyName(e.target.value)}
            placeholder="OP Stack"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Version / Commit *</label>
          <input
            type="text"
            value={dependencyVersion}
            onChange={(e) => setDependencyVersion(e.target.value)}
            placeholder="v1.2.0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={dependencyNote}
            onChange={(e) => setDependencyNote(e.target.value)}
            placeholder="Breaking changes"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !dependencyName.trim() || !dependencyVersion.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Add Dependency' : 'Add Dependency'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Dependency recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}
