'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState, useEffect } from 'react'

interface OnchainAchievementDecayProps {
  achievementId: bigint
}

export default function OnchainAchievementDecay({ achievementId }: OnchainAchievementDecayProps) {
  const { address, isConnected } = useAccount()
  const [decayRate, setDecayRate] = useState(0.1)
  const [decayPeriod, setDecayPeriod] = useState(30)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const [calculatedDecay, setCalculatedDecay] = useState(0)

  useEffect(() => {
    if (post) {
      const daysSinceCreation = Math.floor((Date.now() / 1000 - Number(post.timestamp)) / 86400)
      const periods = Math.floor(daysSinceCreation / decayPeriod)
      setCalculatedDecay(Math.min(periods * decayRate, 1))
    }
  }, [post, decayRate, decayPeriod])

  const configureDecay = async () => {
    if (!isConnected || !address) return

    try {
      const decayData = `DECAY:${decayRate}:${decayPeriod}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, decayData],
      })
    } catch (error) {
      console.error('Decay configuration failed:', error)
    }
  }

  return (
    <AppCard title="📉 Achievement Decay" subtitle="Configure reputation decay over time" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Decay Rate per Period (0-1)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={decayRate}
            onChange={(e) => setDecayRate(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Decay Period (days)</label>
          <input
            type="number"
            min="1"
            max="365"
            value={decayPeriod}
            onChange={(e) => setDecayPeriod(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        {post && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              Estimated decay: {(calculatedDecay * 100).toFixed(1)}%
            </p>
          </div>
        )}
        <button
          onClick={configureDecay}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Configuring...' : 'Configure Decay'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Decay configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

