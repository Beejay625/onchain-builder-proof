'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementBookmarkProps {
  achievementId: bigint
}

export default function OnchainAchievementBookmark({ achievementId }: OnchainAchievementBookmarkProps) {
  const { address, isConnected } = useAccount()
  const [bookmarkNote, setBookmarkNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const bookmarkAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const bookmarkData = `BOOKMARK:note:${bookmarkNote || 'Bookmarked'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, bookmarkData],
      })
    } catch (error) {
      console.error('Bookmarking failed:', error)
    }
  }

  const unbookmarkAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const unbookmarkData = `UNBOOKMARK:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, unbookmarkData],
      })
    } catch (error) {
      console.error('Unbookmarking failed:', error)
    }
  }

  return (
    <AppCard title="🔖 Achievement Bookmark" subtitle="Bookmark achievements for quick access" accent="yellow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bookmark Note (optional)</label>
          <input
            type="text"
            value={bookmarkNote}
            onChange={(e) => setBookmarkNote(e.target.value)}
            placeholder="Why are you bookmarking this?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={bookmarkAchievement}
            disabled={isPending || isConfirming || !isConnected}
            className="flex-1 rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
          >
            {isPending || isConfirming ? 'Bookmarking...' : 'Bookmark'}
          </button>
          <button
            onClick={unbookmarkAchievement}
            disabled={isPending || isConfirming || !isConnected}
            className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
          >
            Unbookmark
          </button>
        </div>
        {isConfirmed && (
          <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-sm text-yellow-800">
            ✅ Bookmark status updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

