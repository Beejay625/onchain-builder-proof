'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementIntegrationStatusProps {
  achievementId: bigint
}

export default function OnchainAchievementIntegrationStatus({ achievementId }: OnchainAchievementIntegrationStatusProps) {
  const { address, isConnected } = useAccount()
  const [partnerName, setPartnerName] = useState('')
  const [integrationStatus, setIntegrationStatus] = useState<'planned' | 'building' | 'live' | 'sunset'>('planned')
  const [integrationNotes, setIntegrationNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logIntegration = async () => {
    if (!isConnected || !address || !partnerName.trim()) return

    try {
      const payload = `INTEGRATION_STATUS:partner:${partnerName}:status:${integrationStatus}:note:${integrationNotes || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Integration status logging failed:', error)
    }
  }

  return (
    <AppCard title="🔌 Integration Status" subtitle="Track ecosystem integrations and health" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Partner / Integration *</label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Reown AppKit, Farcaster, Base Nodes"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={integrationStatus}
            onChange={(e) => setIntegrationStatus(e.target.value as typeof integrationStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="planned">Planned</option>
            <option value="building">Building</option>
            <option value="live">Live</option>
            <option value="sunset">Sunset</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={integrationNotes}
            onChange={(e) => setIntegrationNotes(e.target.value)}
            rows={3}
            placeholder="Pending security review, shared roadmap, etc"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={logIntegration}
          disabled={isPending || isConfirming || !isConnected || !partnerName.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Integration Status'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Integration status recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
