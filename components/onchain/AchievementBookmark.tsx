'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementBookmarkProps {
  achievementId: bigint
}

export default function AchievementBookmark({ achievementId }: AchievementBookmarkProps) {
  const { address, isConnected } = useAccount()
  const [bookmarkCategory, setBookmarkCategory] = useState('')
  const [bookmarkNote, setBookmarkNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainBookmark')) {
    return null
  }

  const handleBookmark = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Bookmark Achievement\nAchievement: #${achievementId.toString()}${bookmarkCategory ? `\nCategory: ${bookmarkCategory}` : ''}${bookmarkNote ? `\nNote: ${bookmarkNote}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Bookmark operation failed:', error)
    }
  }

  return (
    <AppCard title="🔖 Achievement Bookmark" subtitle="Bookmark achievements onchain" accent="amber">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category (optional)</label>
          <input
            type="text"
            value={bookmarkCategory}
            onChange={(e) => setBookmarkCategory(e.target.value)}
            placeholder="e.g., Inspiration, Reference"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Note (optional)</label>
          <textarea
            value={bookmarkNote}
            onChange={(e) => setBookmarkNote(e.target.value)}
            placeholder="Why are you bookmarking this?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleBookmark}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Bookmarking...' : 'Bookmark Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Achievement bookmarked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

