'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState, useEffect } from 'react'

interface OnchainAchievementReachProps {
  achievementId: bigint
}

export default function OnchainAchievementReach({ achievementId }: OnchainAchievementReachProps) {
  const { address, isConnected } = useAccount()
  const [reachScore, setReachScore] = useState(0)
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
      const views = Number(post.likes) * 3
      const interactions = Number(post.comments) * 5
      const calculatedReach = views + interactions
      setReachScore(calculatedReach)
    }
  }, [post])

  const recordReach = async () => {
    if (!isConnected || !address) return

    try {
      const reachData = `REACH:${reachScore}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, reachData],
      })
    } catch (error) {
      console.error('Reach recording failed:', error)
    }
  }

  return (
    <AppCard title="📡 Achievement Reach" subtitle="Track achievement visibility and reach" accent="blue">
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-2xl font-bold text-blue-700">{reachScore}</p>
          <p className="text-sm text-blue-600">Estimated Reach Score</p>
          {post && (
            <div className="mt-2 text-xs text-gray-600">
              Based on {post.likes?.toString() || 0} likes and {post.comments?.toString() || 0} comments
            </div>
          )}
        </div>
        <button
          onClick={recordReach}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Reach Onchain'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Reach score {reachScore} recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

