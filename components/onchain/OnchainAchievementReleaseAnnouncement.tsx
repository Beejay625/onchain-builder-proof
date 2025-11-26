'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementReleaseAnnouncementProps {
  achievementId: bigint
}

export default function OnchainAchievementReleaseAnnouncement({ achievementId }: OnchainAchievementReleaseAnnouncementProps) {
  const { address, isConnected } = useAccount()
  const [channel, setChannel] = useState<'blog' | 'newsletter' | 'social' | 'community'>('blog')
  const [announcementUrl, setAnnouncementUrl] = useState('')
  const [summary, setSummary] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logAnnouncement = async () => {
    if (!isConnected || !address || !announcementUrl.trim()) return

    try {
      const payload = `RELEASE_ANNOUNCEMENT:channel:${channel}:url:${announcementUrl}:summary:${summary || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Release announcement logging failed:', error)
    }
  }

  return (
    <AppCard title="📢 Release Announcement" subtitle="Link launch announcements and recaps" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value as typeof channel)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="blog">Blog</option>
            <option value="newsletter">Newsletter</option>
            <option value="social">Social</option>
            <option value="community">Community Call</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Announcement URL *</label>
          <input
            type="text"
            value={announcementUrl}
            onChange={(e) => setAnnouncementUrl(e.target.value)}
            placeholder="https://mirror.xyz/..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Summary (optional)</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            placeholder="Key highlights from the announcement"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={logAnnouncement}
          disabled={isPending || isConfirming || !isConnected || !announcementUrl.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Announcement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Release announcement recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
