'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementRecurring() {
  const { address, isConnected } = useAccount()
  const [recurrenceType, setRecurrenceType] = useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [recurrenceContent, setRecurrenceContent] = useState('')
  const [endDate, setEndDate] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementRecurring')) {
    return null
  }

  const handleCreateRecurring = async () => {
    if (!isConnected || !address || !recurrenceContent.trim()) return

    try {
      const content = `Recurring Achievement\nType: ${recurrenceType}\nContent: ${recurrenceContent}${endDate ? `\nEnd Date: ${endDate}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Recurring creation failed:', error)
    }
  }

  return (
    <AppCard title="🔄 Achievement Recurring" subtitle="Set up recurring achievement reminders" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recurrence Type</label>
          <select
            value={recurrenceType}
            onChange={(e) => setRecurrenceType(e.target.value as 'daily' | 'weekly' | 'monthly')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Content</label>
          <textarea
            value={recurrenceContent}
            onChange={(e) => setRecurrenceContent(e.target.value)}
            placeholder="What achievement should recur?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date (optional)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateRecurring}
          disabled={isPending || isConfirming || !isConnected || !recurrenceContent.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Recurring Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Recurring achievement created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

