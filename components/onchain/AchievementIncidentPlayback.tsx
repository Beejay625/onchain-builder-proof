'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementIncidentPlaybackProps {
  achievementId: bigint
}

export default function AchievementIncidentPlayback({ achievementId }: AchievementIncidentPlaybackProps) {
  const { isConnected } = useAccount()
  const [incidentName, setIncidentName] = useState('')
  const [severity, setSeverity] = useState<'sev-1' | 'sev-2' | 'sev-3'>('sev-2')
  const [playbackUrl, setPlaybackUrl] = useState('')
  const [summary, setSummary] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess, error } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementIncidentPlayback')) {
    return null
  }

  const handleRecordPlayback = () => {
    if (!isConnected || !incidentName.trim()) {
      return
    }

    const details = [
      'Incident Playback',
      `Achievement: #${achievementId.toString()}`,
      `Incident: ${incidentName}`,
      `Severity: ${severity.toUpperCase()}`,
      playbackUrl ? `Playback: ${playbackUrl}` : null,
      summary ? `Summary: ${summary}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [details],
    })
  }

  return (
    <AppCard
      title="📼 Incident Playback"
      subtitle="Attach immersive incident replays and outcomes to achievements"
      accent="purple"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Incident Name</label>
          <input
            type="text"
            value={incidentName}
            onChange={(e) => setIncidentName(e.target.value)}
            placeholder="Base sequencer stall – Nov 24"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as typeof severity)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="sev-1">SEV-1</option>
              <option value="sev-2">SEV-2</option>
              <option value="sev-3">SEV-3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Playback URL</label>
            <input
              type="url"
              value={playbackUrl}
              onChange={(e) => setPlaybackUrl(e.target.value)}
              placeholder="https://lookerstudio/incident"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Learnings</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            placeholder="Root cause, blast radius, mitigation steps..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordPlayback}
          disabled={isPending || isConfirming || !incidentName.trim() || !isConnected}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Anchoring...' : 'Anchor Playback Evidence'}
        </button>
        {(isSuccess || error) && (
          <div
            className={`rounded-lg border p-3 text-sm ${
              isSuccess ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {isSuccess ? '✅ Incident playback memorialized onchain' : `⚠️ ${error?.message ?? 'Failed to record playback'}`}
          </div>
        )}
      </div>
    </AppCard>
  )
}


