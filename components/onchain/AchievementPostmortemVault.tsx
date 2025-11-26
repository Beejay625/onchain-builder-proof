'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementPostmortemVaultProps {
  achievementId: bigint
}

export default function AchievementPostmortemVault({ achievementId }: AchievementPostmortemVaultProps) {
  const { address, isConnected } = useAccount()
  const [incidentTitle, setIncidentTitle] = useState('')
  const [rootCause, setRootCause] = useState('')
  const [resolution, setResolution] = useState('')
  const [postmortemHash, setPostmortemHash] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementPostmortemVault')) {
    return null
  }

  const handleRecordPostmortem = async () => {
    if (!isConnected || !address || !incidentTitle.trim() || !rootCause.trim()) return

    try {
      const content = `Postmortem Vault\nAchievement: #${achievementId.toString()}\nIncident: ${incidentTitle}\nRoot Cause: ${rootCause}\nResolution: ${resolution || 'N/A'}\nHash: ${postmortemHash || 'N/A'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Postmortem recording failed:', error)
    }
  }

  return (
    <AppCard title="📋 Postmortem Vault" subtitle="Store immutable postmortem records with root cause analysis" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Incident Title</label>
          <input
            type="text"
            value={incidentTitle}
            onChange={(e) => setIncidentTitle(e.target.value)}
            placeholder="Service outage on 2025-11-24"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Root Cause</label>
          <textarea
            value={rootCause}
            onChange={(e) => setRootCause(e.target.value)}
            placeholder="Describe the root cause analysis..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resolution</label>
          <textarea
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="How was the incident resolved?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Postmortem Hash (Optional)</label>
          <input
            type="text"
            value={postmortemHash}
            onChange={(e) => setPostmortemHash(e.target.value)}
            placeholder="IPFS hash or document reference"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleRecordPostmortem}
          disabled={isPending || isConfirming || !isConnected || !incidentTitle.trim() || !rootCause.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Postmortem'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Postmortem recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}



