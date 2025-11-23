'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState, useEffect } from 'react'

interface OnchainAchievementAdvancementScoreProps {
  achievementId: bigint
}

export default function OnchainAchievementAdvancementScore({ achievementId }: OnchainAchievementAdvancementScoreProps) {
  const { address, isConnected } = useAccount()
  const [advancementScore, setAdvancementScore] = useState(0)
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
      const calculatedScore = (Number(post.likes) * 2) + (Number(post.comments) * 5) + 10
      setAdvancementScore(calculatedScore)
    }
  }, [post])

  const recordAdvancementScore = async () => {
    if (!isConnected || !address) return

    try {
      const scoreData = `ADVANCEMENT_SCORE:${advancementScore}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, scoreData],
      })
    } catch (error) {
      console.error('Advancement score recording failed:', error)
    }
  }

  return (
    <AppCard title="📈 Advancement Score" subtitle="Calculate and record advancement score" accent="green">
      <div className="space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-2xl font-bold text-green-700">{advancementScore}</p>
          <p className="text-sm text-green-600">Current Advancement Score</p>
          {post && (
            <div className="mt-2 text-xs text-gray-600">
              Based on: {post.likes?.toString() || 0} likes, {post.comments?.toString() || 0} comments
            </div>
          )}
        </div>
        <button
          onClick={recordAdvancementScore}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Score Onchain'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Advancement score {advancementScore} recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

