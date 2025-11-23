'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementReownIntegrationProps {
  achievementId?: bigint
}

export default function AchievementReownIntegration({ achievementId }: AchievementReownIntegrationProps) {
  const { address, isConnected } = useAccount()
  const [sessionScope, setSessionScope] = useState('')
  const [deviceTag, setDeviceTag] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementReownIntegration')) {
    return null
  }

  const handleRecordSession = async () => {
    if (!isConnected || !address) return

    try {
      const reownContent = `REOWN:${sessionScope || 'default'}:${deviceTag || 'unknown'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: achievementId ? 'addComment' : 'createPost',
        args: achievementId ? [achievementId, reownContent] : [reownContent],
      })
    } catch (error) {
      console.error('Reown session recording failed:', error)
    }
  }

  return (
    <AppCard title="🔌 Reown Integration" subtitle="Enhanced Reown wallet connectivity features" accent="indigo">
      <div className="space-y-4">
        <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-sm text-indigo-800">
          🔗 Record Reown wallet session details onchain for enhanced connectivity tracking
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Scope (Optional)</label>
          <input
            type="text"
            value={sessionScope}
            onChange={(e) => setSessionScope(e.target.value)}
            placeholder="e.g., read, write, admin"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Device Tag (Optional)</label>
          <input
            type="text"
            value={deviceTag}
            onChange={(e) => setDeviceTag(e.target.value)}
            placeholder="e.g., mobile, desktop, tablet"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordSession}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording Session...' : 'Record Reown Session'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-sm text-indigo-800">
            ✅ Reown session recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

