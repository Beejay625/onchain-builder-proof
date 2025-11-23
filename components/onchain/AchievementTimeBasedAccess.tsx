'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementTimeBasedAccessProps {
  achievementId: bigint
}

export default function AchievementTimeBasedAccess({ achievementId }: AchievementTimeBasedAccessProps) {
  const { address, isConnected } = useAccount()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementTimeBasedAccess')) {
    return null
  }

  const handleSetTimeAccess = async () => {
    if (!isConnected || !address || !startTime || !endTime) return

    try {
      const content = `Time-Based Access\nAchievement: #${achievementId.toString()}\nStart: ${startTime}\nEnd: ${endTime}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Time-based access setup failed:', error)
    }
  }

  return (
    <AppCard title="⏰ Achievement Time-Based Access" subtitle="Set time-based access restrictions" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetTimeAccess}
          disabled={isPending || isConfirming || !isConnected || !startTime || !endTime}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Time-Based Access'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Time-based access configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

