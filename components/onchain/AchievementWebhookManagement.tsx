'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementWebhookManagementProps {
  achievementId: bigint
}

export default function AchievementWebhookManagement({ achievementId }: AchievementWebhookManagementProps) {
  const { address, isConnected } = useAccount()
  const [webhookUrl, setWebhookUrl] = useState('')
  const [webhookEvents, setWebhookEvents] = useState<string[]>([])
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementWebhookManagement')) {
    return null
  }

  const handleCreateWebhook = async () => {
    if (!isConnected || !address || !webhookUrl.trim() || webhookEvents.length === 0) return

    try {
      const content = `Webhook Management\nAchievement: #${achievementId.toString()}\nURL: ${webhookUrl}\nEvents: ${webhookEvents.join(', ')}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Webhook creation failed:', error)
    }
  }

  const toggleEvent = (event: string) => {
    setWebhookEvents(prev => 
      prev.includes(event) 
        ? prev.filter(e => e !== event)
        : [...prev, event]
    )
  }

  const availableEvents = ['created', 'updated', 'deleted', 'liked', 'commented']

  return (
    <AppCard title="🔗 Achievement Webhook Management" subtitle="Manage webhooks for achievement events" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://example.com/webhook"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Events</label>
          <div className="space-y-2">
            {availableEvents.map((event) => (
              <label key={event} className="flex items-center">
                <input
                  type="checkbox"
                  checked={webhookEvents.includes(event)}
                  onChange={() => toggleEvent(event)}
                  className="rounded border-gray-300"
                />
                <span className="ml-2 text-sm capitalize">{event}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleCreateWebhook}
          disabled={isPending || isConfirming || !isConnected || !webhookUrl.trim() || webhookEvents.length === 0}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Webhook'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Webhook created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

