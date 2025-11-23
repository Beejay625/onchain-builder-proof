'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementAutomatedMilestonesProps {
  achievementId: bigint
}

export default function AchievementAutomatedMilestones({ achievementId }: AchievementAutomatedMilestonesProps) {
  const { address, isConnected } = useAccount()
  const [triggerCondition, setTriggerCondition] = useState('')
  const [milestoneAction, setMilestoneAction] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementAutomatedMilestones')) {
    return null
  }

  const handleSetupAutomation = async () => {
    if (!isConnected || !address || !triggerCondition.trim() || !milestoneAction.trim()) return

    try {
      const automationContent = `AUTOMILESTONE:${triggerCondition}:${milestoneAction}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, automationContent],
      })
    } catch (error) {
      console.error('Automated milestone setup failed:', error)
    }
  }

  return (
    <AppCard title="🎯 Automated Milestones" subtitle="Auto-trigger milestones based on conditions" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Condition</label>
          <select
            value={triggerCondition}
            onChange={(e) => setTriggerCondition(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="">Select condition...</option>
            <option value="likes_100">100 Likes</option>
            <option value="comments_50">50 Comments</option>
            <option value="shares_25">25 Shares</option>
            <option value="time_30days">30 Days</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Milestone Action</label>
          <select
            value={milestoneAction}
            onChange={(e) => setMilestoneAction(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="">Select action...</option>
            <option value="mint_badge">Mint Badge</option>
            <option value="distribute_reward">Distribute Reward</option>
            <option value="unlock_content">Unlock Content</option>
            <option value="upgrade_tier">Upgrade Tier</option>
          </select>
        </div>
        <button
          onClick={handleSetupAutomation}
          disabled={isPending || isConfirming || !isConnected || !triggerCondition.trim() || !milestoneAction.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Automated Milestone'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-sm text-indigo-800">
            ✅ Automated milestone configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

