'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementSyndicationProps {
  achievementId: bigint
}

export default function AchievementSyndication({ achievementId }: AchievementSyndicationProps) {
  const { address, isConnected } = useAccount()
  const [platform, setPlatform] = useState('')
  const [syndicationLink, setSyndicationLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementSyndication')) {
    return null
  }

  const handleSyndicate = async () => {
    if (!isConnected || !address || !platform.trim() || !syndicationLink.trim()) return

    try {
      const syndicationContent = `SYNDICATION:${platform}:${syndicationLink}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, syndicationContent],
      })
    } catch (error) {
      console.error('Syndication failed:', error)
    }
  }

  return (
    <AppCard title="📡 Syndication" subtitle="Syndicate achievements across platforms" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="">Select platform...</option>
            <option value="Twitter">Twitter/X</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Medium">Medium</option>
            <option value="Mirror">Mirror</option>
            <option value="Lens">Lens Protocol</option>
            <option value="Farcaster">Farcaster</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Syndication Link</label>
          <input
            type="url"
            value={syndicationLink}
            onChange={(e) => setSyndicationLink(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSyndicate}
          disabled={isPending || isConfirming || !isConnected || !platform.trim() || !syndicationLink.trim()}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Syndicating...' : 'Record Syndication'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-cyan-50 border border-cyan-200 p-3 text-sm text-cyan-800">
            ✅ Achievement syndicated onchain to {platform}
          </div>
        )}
      </div>
    </AppCard>
  )
}

