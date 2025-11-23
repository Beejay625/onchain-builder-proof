'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState, useEffect } from 'react'

interface OnchainAchievementPerformanceProps {
  achievementId: bigint
}

export default function OnchainAchievementPerformance({ achievementId }: OnchainAchievementPerformanceProps) {
  const { address, isConnected } = useAccount()
  const [performanceScore, setPerformanceScore] = useState(0)
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
      const engagement = Number(post.likes) * 2 + Number(post.comments) * 5
      const recency = Math.max(0, 100 - Math.floor((Date.now() / 1000 - Number(post.timestamp)) / 86400))
      const score = Math.min(100, engagement + recency)
      setPerformanceScore(score)
    }
  }, [post])

  const recordPerformance = async () => {
    if (!isConnected || !address) return

    try {
      const performanceData = `PERFORMANCE:${performanceScore}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, performanceData],
      })
    } catch (error) {
      console.error('Performance recording failed:', error)
    }
  }

  return (
    <AppCard title="⚡ Achievement Performance" subtitle="Track overall performance score" accent="green">
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-2xl font-bold text-green-700">{performanceScore}/100</p>
          <p className="text-sm text-green-600">Performance Score</p>
          <p className="text-xs text-gray-600 mt-1">Based on engagement and recency</p>
        </div>
        <button
          onClick={recordPerformance}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Performance'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Performance score {performanceScore}/100 recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

