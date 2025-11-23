'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState, useEffect } from 'react'

interface OnchainAchievementAmplificationScoreProps {
  achievementId: bigint
}

export default function OnchainAchievementAmplificationScore({ achievementId }: OnchainAchievementAmplificationScoreProps) {
  const { address, isConnected } = useAccount()
  const [amplificationScore, setAmplificationScore] = useState(0)
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
      const engagement = Number(post.likes) + (Number(post.comments) * 2)
      const timeFactor = Math.max(0, 1 - (Date.now() / 1000 - Number(post.timestamp)) / 2592000)
      const calculatedScore = Math.floor(engagement * (1 + timeFactor))
      setAmplificationScore(calculatedScore)
    }
  }, [post])

  const recordAmplificationScore = async () => {
    if (!isConnected || !address) return

    try {
      const scoreData = `AMPLIFICATION_SCORE:${amplificationScore}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, scoreData],
      })
    } catch (error) {
      console.error('Amplification score recording failed:', error)
    }
  }

  return (
    <AppCard title="📢 Amplification Score" subtitle="Measure achievement reach and engagement" accent="purple">
      <div className="space-y-4">
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-2xl font-bold text-purple-700">{amplificationScore}</p>
          <p className="text-sm text-purple-600">Current Amplification Score</p>
          <p className="text-xs text-gray-600 mt-1">Based on engagement and recency</p>
        </div>
        <button
          onClick={recordAmplificationScore}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Score Onchain'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Amplification score {amplificationScore} recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

