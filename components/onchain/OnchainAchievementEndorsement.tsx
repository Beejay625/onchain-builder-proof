'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementEndorsementProps {
  achievementId: bigint
}

export default function OnchainAchievementEndorsement({ achievementId }: OnchainAchievementEndorsementProps) {
  const { address, isConnected } = useAccount()
  const [endorsementText, setEndorsementText] = useState('')
  const [endorsementType, setEndorsementType] = useState<'skill' | 'quality' | 'impact' | 'general'>('general')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const endorseAchievement = async () => {
    if (!isConnected || !address || !endorsementText.trim()) return

    try {
      const endorsementData = `ENDORSEMENT:${endorsementType}:${endorsementText}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, endorsementData],
      })
    } catch (error) {
      console.error('Endorsement failed:', error)
    }
  }

  return (
    <AppCard title="⭐ Achievement Endorsement" subtitle="Endorse achievement with statement" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Endorsement Type</label>
          <select
            value={endorsementType}
            onChange={(e) => setEndorsementType(e.target.value as typeof endorsementType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="skill">Skill</option>
            <option value="quality">Quality</option>
            <option value="impact">Impact</option>
            <option value="general">General</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Endorsement Statement *</label>
          <textarea
            value={endorsementText}
            onChange={(e) => setEndorsementText(e.target.value)}
            placeholder="Write your endorsement..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={endorseAchievement}
          disabled={isPending || isConfirming || !isConnected || !endorsementText.trim()}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Endorsing...' : 'Endorse Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Endorsement recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

