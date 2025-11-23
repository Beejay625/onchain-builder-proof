'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementScheduling() {
  const { address, isConnected } = useAccount()
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [achievementContent, setAchievementContent] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementScheduling')) {
    return null
  }

  const handleSchedule = async () => {
    if (!isConnected || !address || !scheduledDate || !achievementContent.trim()) return

    try {
      const scheduledDateTime = `${scheduledDate} ${scheduledTime || '00:00'}`
      const content = `Scheduled Achievement\nDate: ${scheduledDateTime}\nContent: ${achievementContent}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Scheduling failed:', error)
    }
  }

  return (
    <AppCard title="📅 Achievement Scheduling" subtitle="Schedule achievements for future publishing" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
          <input
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time (optional)</label>
          <input
            type="time"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Content</label>
          <textarea
            value={achievementContent}
            onChange={(e) => setAchievementContent(e.target.value)}
            placeholder="What achievement will be published?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSchedule}
          disabled={isPending || isConfirming || !isConnected || !scheduledDate || !achievementContent.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Scheduling...' : 'Schedule Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Achievement scheduled onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

