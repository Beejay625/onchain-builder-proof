'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface VersionControlProps {
  achievementId: bigint
}

export default function VersionControl({ achievementId }: VersionControlProps) {
  const { address, isConnected } = useAccount()
  const [versionNumber, setVersionNumber] = useState('1.0.0')
  const [versionNotes, setVersionNotes] = useState('')
  const [changeType, setChangeType] = useState<'major' | 'minor' | 'patch'>('patch')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainVersionControl')) {
    return null
  }

  const handleCreateVersion = async () => {
    if (!isConnected || !address || !versionNumber.trim()) return

    try {
      const content = `Version Control\nAchievement: #${achievementId.toString()}\nVersion: ${versionNumber}\nType: ${changeType}${versionNotes ? `\nNotes: ${versionNotes}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Version creation failed:', error)
    }
  }

  return (
    <AppCard title="📋 Version Control" subtitle="Track version history for achievements" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Version Number</label>
          <input
            type="text"
            value={versionNumber}
            onChange={(e) => setVersionNumber(e.target.value)}
            placeholder="1.0.0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Change Type</label>
          <select
            value={changeType}
            onChange={(e) => setChangeType(e.target.value as 'major' | 'minor' | 'patch')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="patch">Patch</option>
            <option value="minor">Minor</option>
            <option value="major">Major</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Version Notes (optional)</label>
          <textarea
            value={versionNotes}
            onChange={(e) => setVersionNotes(e.target.value)}
            placeholder="What changed in this version?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateVersion}
          disabled={isPending || isConfirming || !isConnected || !versionNumber.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Version'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Version recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

