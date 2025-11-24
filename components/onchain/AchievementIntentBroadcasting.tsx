'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementIntentBroadcasting() {
  const { address, isConnected } = useAccount()
  const [intentSummary, setIntentSummary] = useState('Mint three achievements and route to Base + Optimism.')
  const [deadline, setDeadline] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementIntentBroadcasting')) {
    return null
  }

  const handleBroadcast = async () => {
    if (!isConnected || !address || !intentSummary.trim()) return

    try {
      const content = `Intent Broadcast\nIntent: ${intentSummary}${deadline ? `\nDeadline: ${deadline}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Intent broadcast failed:', error)
    }
  }

  return (
    <AppCard title="📣 Intent Broadcasting" subtitle="Record intent payloads shared with solvers" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Intent Summary</label>
          <textarea
            value={intentSummary}
            onChange={(e) => setIntentSummary(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (optional)</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleBroadcast}
          disabled={isPending || isConfirming || !isConnected || !intentSummary.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Broadcasting...' : 'Broadcast Intent'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Intent broadcast recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

