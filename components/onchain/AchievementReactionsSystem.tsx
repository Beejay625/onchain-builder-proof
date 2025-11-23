'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementReactionsSystemProps {
  achievementId: bigint
}

export default function AchievementReactionsSystem({ achievementId }: AchievementReactionsSystemProps) {
  const { address, isConnected } = useAccount()
  const [reactionType, setReactionType] = useState<'like' | 'love' | 'celebrate' | 'support'>('like')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementReactionsSystem')) {
    return null
  }

  const handleReact = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Reaction\nAchievement: #${achievementId.toString()}\nType: ${reactionType}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Reaction failed:', error)
    }
  }

  const reactions = [
    { type: 'like', emoji: '👍', label: 'Like' },
    { type: 'love', emoji: '❤️', label: 'Love' },
    { type: 'celebrate', emoji: '🎉', label: 'Celebrate' },
    { type: 'support', emoji: '💪', label: 'Support' },
  ]

  return (
    <AppCard title="😊 Achievement Reactions System" subtitle="React to achievements with emojis" accent="pink">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {reactions.map((reaction) => (
            <button
              key={reaction.type}
              onClick={() => {
                setReactionType(reaction.type as 'like' | 'love' | 'celebrate' | 'support')
                handleReact()
              }}
              disabled={isPending || isConfirming || !isConnected}
              className={`p-3 rounded-lg border-2 transition-all ${
                reactionType === reaction.type
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              } disabled:opacity-50`}
            >
              <span className="text-2xl">{reaction.emoji}</span>
              <p className="text-xs mt-1">{reaction.label}</p>
            </button>
          ))}
        </div>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Reaction recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

