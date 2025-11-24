'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementCommunityPulseProps {
  achievementId: bigint
}

export default function OnchainAchievementCommunityPulse({ achievementId }: OnchainAchievementCommunityPulseProps) {
  const { address, isConnected } = useAccount()
  const [communityChannel, setCommunityChannel] = useState('')
  const [communitySentiment, setCommunitySentiment] = useState('')
  const [communityNote, setCommunityNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !communityChannel.trim() || !communitySentiment.trim()) return

    try {
      const payload = `COMMUNITY_PULSE:channel:${communityChannel}:sentiment:${communitySentiment}:note:${communityNote || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🌐 Community Pulse submission failed:', error)
    }
  }

  return (
    <AppCard title="🌐 Community Pulse" subtitle="Capture sentiment from forums or spaces" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel *</label>
          <input
            type="text"
            value={communityChannel}
            onChange={(e) => setCommunityChannel(e.target.value)}
            placeholder="Discord, Farcaster"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sentiment *</label>
          <input
            type="text"
            value={communitySentiment}
            onChange={(e) => setCommunitySentiment(e.target.value)}
            placeholder="Bullish / cautious"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={communityNote}
            onChange={(e) => setCommunityNote(e.target.value)}
            placeholder="Why this sentiment"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !communityChannel.trim() || !communitySentiment.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Saving Community Pulse' : 'Save Community Pulse'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Community pulse saved
          </div>
        )}
      </div>
    </AppCard>
  )
}
