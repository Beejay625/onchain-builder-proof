'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementSmartContractEventsProps {
  achievementId: bigint
}

export default function AchievementSmartContractEvents({ achievementId }: AchievementSmartContractEventsProps) {
  const { address, isConnected } = useAccount()
  const [eventName, setEventName] = useState('')
  const [eventData, setEventData] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementSmartContractEvents')) {
    return null
  }

  const handleEmitEvent = async () => {
    if (!isConnected || !address || !eventName.trim()) return

    try {
      const content = `Smart Contract Event\nAchievement: #${achievementId.toString()}\nEvent: ${eventName}${eventData ? `\nData: ${eventData}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Event emission failed:', error)
    }
  }

  return (
    <AppCard title="📡 Achievement Smart Contract Events" subtitle="Record smart contract event emissions for off-chain indexing" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="AchievementCreated"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Data (optional)</label>
          <textarea
            value={eventData}
            onChange={(e) => setEventData(e.target.value)}
            placeholder="Event parameters..."
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleEmitEvent}
          disabled={isPending || isConfirming || !isConnected || !eventName.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Emitting...' : 'Emit Event'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Event emitted onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

