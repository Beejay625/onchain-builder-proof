'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementFollowingProps {
  achievementId: bigint
  authorAddress?: string
}

export default function OnchainAchievementFollowing({ achievementId, authorAddress }: OnchainAchievementFollowingProps) {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const followAuthor = async () => {
    if (!isConnected || !address || !authorAddress) return

    try {
      const followData = `FOLLOW:author:${authorAddress}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, followData],
      })
    } catch (error) {
      console.error('Following failed:', error)
    }
  }

  const unfollowAuthor = async () => {
    if (!isConnected || !address || !authorAddress) return

    try {
      const unfollowData = `UNFOLLOW:author:${authorAddress}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, unfollowData],
      })
    } catch (error) {
      console.error('Unfollowing failed:', error)
    }
  }

  return (
    <AppCard title="👥 Achievement Following" subtitle="Follow achievement authors" accent="blue">
      <div className="space-y-4">
        {authorAddress && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Author: <span className="font-mono text-xs">{authorAddress.slice(0, 6)}...{authorAddress.slice(-4)}</span>
            </p>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={followAuthor}
            disabled={isPending || isConfirming || !isConnected || !authorAddress}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isPending || isConfirming ? 'Following...' : 'Follow Author'}
          </button>
          <button
            onClick={unfollowAuthor}
            disabled={isPending || isConfirming || !isConnected || !authorAddress}
            className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
          >
            Unfollow
          </button>
        </div>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Follow status updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

