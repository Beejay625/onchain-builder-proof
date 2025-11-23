'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState, useEffect } from 'react'

interface OnchainAchievementVelocityProps {
  achievementId: bigint
}

export default function OnchainAchievementVelocity({ achievementId }: OnchainAchievementVelocityProps) {
  const { address, isConnected } = useAccount()
  const [velocityScore, setVelocityScore] = useState(0)
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
      const hoursSinceCreation = Math.max(1, (Date.now() / 1000 - Number(post.timestamp)) / 3600)
      const interactions = Number(post.likes) + (Number(post.comments) * 2)
      const velocity = Math.round((interactions / hoursSinceCreation) * 100) / 100
      setVelocityScore(velocity)
    }
  }, [post])

  const recordVelocity = async () => {
    if (!isConnected || !address) return

    try {
      const velocityData = `VELOCITY:${velocityScore}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, velocityData],
      })
    } catch (error) {
      console.error('Velocity recording failed:', error)
    }
  }

  return (
    <AppCard title="⚡ Achievement Velocity" subtitle="Measure achievement momentum" accent="orange">
      <div className="space-y-4">
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-2xl font-bold text-orange-700">{velocityScore}</p>
          <p className="text-sm text-orange-600">Velocity Score (interactions/hour)</p>
          <p className="text-xs text-gray-600 mt-1">Higher = faster growth</p>
        </div>
        <button
          onClick={recordVelocity}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Velocity'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Velocity score {velocityScore} recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

