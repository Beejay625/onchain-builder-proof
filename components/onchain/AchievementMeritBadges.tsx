'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementMeritBadgesProps {
  skillCategory: string
}

export default function AchievementMeritBadges({ skillCategory }: AchievementMeritBadgesProps) {
  const { address, isConnected } = useAccount()
  const [skillLevel, setSkillLevel] = useState('1')
  const [proofLink, setProofLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementMeritBadges')) {
    return null
  }

  const handleMintBadge = async () => {
    if (!isConnected || !address || !skillCategory || !proofLink.trim()) return

    try {
      const badgeContent = `MERITBADGE:${skillCategory}:LEVEL${skillLevel}:${proofLink}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [badgeContent],
      })
    } catch (error) {
      console.error('Merit badge mint failed:', error)
    }
  }

  return (
    <AppCard title="🏅 Merit Badges" subtitle="Earn skill-based merit badges with levels" accent="gold">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skill Category</label>
          <input
            type="text"
            value={skillCategory}
            readOnly
            className="w-full rounded-lg border border-gray-300 p-2 text-sm bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level (1-5)</label>
          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="1">Level 1 - Beginner</option>
            <option value="2">Level 2 - Intermediate</option>
            <option value="3">Level 3 - Advanced</option>
            <option value="4">Level 4 - Expert</option>
            <option value="5">Level 5 - Master</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Link</label>
          <input
            type="url"
            value={proofLink}
            onChange={(e) => setProofLink(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleMintBadge}
          disabled={isPending || isConfirming || !isConnected || !proofLink.trim()}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Minting Badge...' : 'Mint Merit Badge'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Merit badge minted onchain at level {skillLevel}
          </div>
        )}
      </div>
    </AppCard>
  )
}

