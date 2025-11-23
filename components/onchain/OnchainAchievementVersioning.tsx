'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementVersioningProps {
  achievementId: bigint
}

export default function OnchainAchievementVersioning({ achievementId }: OnchainAchievementVersioningProps) {
  const { address, isConnected } = useAccount()
  const [versionNumber, setVersionNumber] = useState('')
  const [versionChanges, setVersionChanges] = useState('')
  const [versionType, setVersionType] = useState<'major' | 'minor' | 'patch'>('patch')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const createVersion = async () => {
    if (!isConnected || !address || !versionNumber.trim() || !versionChanges.trim()) return

    try {
      const versionData = `VERSION:${versionType}:${versionNumber}:changes:${versionChanges}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, versionData],
      })
    } catch (error) {
      console.error('Versioning failed:', error)
    }
  }

  return (
    <AppCard title="📋 Achievement Versioning" subtitle="Track version history for achievements" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Version Type</label>
          <select
            value={versionType}
            onChange={(e) => setVersionType(e.target.value as typeof versionType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="patch">Patch</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Version Number *</label>
          <input
            type="text"
            value={versionNumber}
            onChange={(e) => setVersionNumber(e.target.value)}
            placeholder="e.g., 1.2.3"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Version Changes *</label>
          <textarea
            value={versionChanges}
            onChange={(e) => setVersionChanges(e.target.value)}
            placeholder="What changed in this version?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={createVersion}
          disabled={isPending || isConfirming || !isConnected || !versionNumber.trim() || !versionChanges.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Version'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Version {versionNumber} recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

