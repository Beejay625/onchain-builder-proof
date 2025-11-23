'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementAPIRateLimitingProps {
  achievementId: bigint
}

export default function AchievementAPIRateLimiting({ achievementId }: AchievementAPIRateLimitingProps) {
  const { address, isConnected } = useAccount()
  const [rateLimit, setRateLimit] = useState('100')
  const [timeWindow, setTimeWindow] = useState<'minute' | 'hour' | 'day'>('hour')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementAPIRateLimiting')) {
    return null
  }

  const handleSetRateLimit = async () => {
    if (!isConnected || !address || !rateLimit.trim()) return

    try {
      const content = `API Rate Limiting\nAchievement: #${achievementId.toString()}\nLimit: ${rateLimit} requests per ${timeWindow}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Rate limit setup failed:', error)
    }
  }

  return (
    <AppCard title="⚡ Achievement API Rate Limiting" subtitle="Configure API rate limits for achievements" accent="amber">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit</label>
          <input
            type="number"
            value={rateLimit}
            onChange={(e) => setRateLimit(e.target.value)}
            placeholder="100"
            min={1}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Window</label>
          <select
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value as 'minute' | 'hour' | 'day')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="minute">Per Minute</option>
            <option value="hour">Per Hour</option>
            <option value="day">Per Day</option>
          </select>
        </div>
        <button
          onClick={handleSetRateLimit}
          disabled={isPending || isConfirming || !isConnected || !rateLimit.trim()}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Rate Limit'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Rate limit configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

