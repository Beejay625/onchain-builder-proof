'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState, useEffect } from 'react'

interface OnchainAchievementEngagementProps {
  achievementId: bigint
}

export default function OnchainAchievementEngagement({ achievementId }: OnchainAchievementEngagementProps) {
  const { address, isConnected } = useAccount()
  const [engagementRate, setEngagementRate] = useState(0)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  useEffect(() => {
    if (post) {
      const totalInteractions = Number(post.likes) + Number(post.comments)
      const daysSinceCreation = Math.max(1, Math.floor((Date.now() / 1000 - Number(post.timestamp)) / 86400))
      const rate = (totalInteractions / daysSinceCreation) * 100
      setEngagementRate(Math.round(rate * 100) / 100)
    }
  }, [post])

  const recordEngagement = async () => {
    if (!isConnected || !address) return

    try {
      const engagementData = `ENGAGEMENT:${engagementRate}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, engagementData],
      })
    } catch (error) {
      console.error('Engagement recording failed:', error)
    }
  }

  return (
    <AppCard title="💬 Achievement Engagement" subtitle="Track engagement rate over time" accent="purple">
      <div className="space-y-4">
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-2xl font-bold text-purple-700">{engagementRate}%</p>
          <p className="text-sm text-purple-600">Engagement Rate</p>
          {post && (
            <div className="mt-2 text-xs text-gray-600">
              {post.likes?.toString() || 0} likes + {post.comments?.toString() || 0} comments
            </div>
          )}
        </div>
        <button
          onClick={recordEngagement}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Engagement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Engagement rate {engagementRate}% recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

