'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState, useEffect } from 'react'

interface OnchainAchievementMetricsProps {
  achievementId: bigint
}

export default function OnchainAchievementMetrics({ achievementId }: OnchainAchievementMetricsProps) {
  const { address, isConnected } = useAccount()
  const [metrics, setMetrics] = useState({
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
  })
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
      setMetrics({
        views: Number(post.likes) * 3,
        likes: Number(post.likes),
        comments: Number(post.comments),
        shares: 0,
      })
    }
  }, [post])

  const recordMetrics = async () => {
    if (!isConnected || !address) return

    try {
      const metricsData = `METRICS:views:${metrics.views}:likes:${metrics.likes}:comments:${metrics.comments}:shares:${metrics.shares}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, metricsData],
      })
    } catch (error) {
      console.error('Metrics recording failed:', error)
    }
  }

  return (
    <AppCard title="📊 Achievement Metrics" subtitle="Comprehensive metrics dashboard" accent="blue">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-lg font-bold text-blue-700">{metrics.views}</p>
            <p className="text-xs text-blue-600">Views</p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-lg font-bold text-green-700">{metrics.likes}</p>
            <p className="text-xs text-green-600">Likes</p>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-lg font-bold text-purple-700">{metrics.comments}</p>
            <p className="text-xs text-purple-600">Comments</p>
          </div>
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-lg font-bold text-orange-700">{metrics.shares}</p>
            <p className="text-xs text-orange-600">Shares</p>
          </div>
        </div>
        <button
          onClick={recordMetrics}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Metrics Onchain'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Metrics recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

