'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementLinkingProps {
  achievementId: bigint
}

export default function OnchainAchievementLinking({ achievementId }: OnchainAchievementLinkingProps) {
  const { address, isConnected } = useAccount()
  const [linkedAchievementId, setLinkedAchievementId] = useState('')
  const [linkType, setLinkType] = useState<'related' | 'prerequisite' | 'successor' | 'dependency'>('related')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const linkAchievement = async () => {
    if (!isConnected || !address || !linkedAchievementId.trim()) return

    try {
      const linkData = `LINK:${linkType}:${linkedAchievementId}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, linkData],
      })
    } catch (error) {
      console.error('Linking failed:', error)
    }
  }

  return (
    <AppCard title="🔗 Achievement Linking" subtitle="Link related achievements" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Link Type</label>
          <select
            value={linkType}
            onChange={(e) => setLinkType(e.target.value as typeof linkType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="related">Related</option>
            <option value="prerequisite">Prerequisite</option>
            <option value="successor">Successor</option>
            <option value="dependency">Dependency</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Linked Achievement ID *</label>
          <input
            type="text"
            value={linkedAchievementId}
            onChange={(e) => setLinkedAchievementId(e.target.value)}
            placeholder="Enter achievement ID"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={linkAchievement}
          disabled={isPending || isConfirming || !isConnected || !linkedAchievementId.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Linking...' : 'Link Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Achievement linked as {linkType} onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

