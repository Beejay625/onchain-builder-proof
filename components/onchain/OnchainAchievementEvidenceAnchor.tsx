'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementEvidenceAnchorProps {
  achievementId: bigint
}

export default function OnchainAchievementEvidenceAnchor({ achievementId }: OnchainAchievementEvidenceAnchorProps) {
  const { address, isConnected } = useAccount()
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')
  const [checksum, setChecksum] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const anchorEvidence = async () => {
    if (!isConnected || !address || !label.trim() || !url.trim()) return

    try {
      const payload = `EVIDENCE_ANCHOR:label:${label}:url:${url}:checksum:${checksum || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Evidence anchor failed:', error)
    }
  }

  return (
    <AppCard title="🧷 Evidence Anchor" subtitle="Permanently reference external dashboards or tx" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Label *</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Grafana uptime chart"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence URL / Hash *</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://... or ipfs://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Checksum (optional)</label>
          <input
            type="text"
            value={checksum}
            onChange={(e) => setChecksum(e.target.value)}
            placeholder="sha256..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={anchorEvidence}
          disabled={isPending || isConfirming || !isConnected || !label.trim() || !url.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Anchoring...' : 'Anchor Evidence'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Evidence anchor stored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
