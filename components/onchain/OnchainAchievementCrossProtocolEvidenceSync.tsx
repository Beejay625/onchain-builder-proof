'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementCrossProtocolEvidenceSyncProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossProtocolEvidenceSync({
  achievementId,
}: OnchainAchievementCrossProtocolEvidenceSyncProps) {
  const { address, isConnected } = useAccount()
  const [syncId, setSyncId] = useState('')
  const [sourceProtocol, setSourceProtocol] = useState('')
  const [targetProtocol, setTargetProtocol] = useState('')
  const [evidenceCount, setEvidenceCount] = useState('')
  const [syncStatus, setSyncStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementCrossProtocolEvidenceSync')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !syncId || !sourceProtocol || !targetProtocol || !evidenceCount) return

    try {
      const proofHash = keccak256(toBytes(`${syncId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logCrossProtocolEvidenceSync',
        args: [
          achievementId,
          syncId,
          sourceProtocol,
          targetProtocol,
          BigInt(evidenceCount),
          proofHash,
          syncStatus,
        ],
      })
    } catch (error) {
      console.error('Cross-protocol evidence sync submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Cross-Protocol Evidence Sync"
      subtitle="Sync evidence across different protocols with secure verification"
      accent="green"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sync ID *
          </label>
          <input
            type="text"
            value={syncId}
            onChange={(e) => setSyncId(e.target.value)}
            placeholder="sync-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Protocol *
          </label>
          <input
            type="text"
            value={sourceProtocol}
            onChange={(e) => setSourceProtocol(e.target.value)}
            placeholder="Ethereum"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Protocol *
          </label>
          <input
            type="text"
            value={targetProtocol}
            onChange={(e) => setTargetProtocol(e.target.value)}
            placeholder="Polygon"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Evidence Count *
          </label>
          <input
            type="number"
            value={evidenceCount}
            onChange={(e) => setEvidenceCount(e.target.value)}
            placeholder="15"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={syncStatus}
            onChange={(e) => setSyncStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="syncing">Syncing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !syncId || !sourceProtocol || !targetProtocol || !evidenceCount}
          className="w-full rounded-lg bg-green-600 text-white py-3 px-4 font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Synced!'
                : 'Sync Evidence'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Evidence sync successful!</p>
        )}
      </div>
    </AppCard>
  )
}

