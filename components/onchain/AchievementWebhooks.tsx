'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementWebhooksProps {
  achievementId?: bigint
}

export default function AchievementWebhooks({ achievementId }: AchievementWebhooksProps) {
  const { address, isConnected } = useAccount()
  const [webhookUrl, setWebhookUrl] = useState('')
  const [eventTypes, setEventTypes] = useState<string[]>([])
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementWebhooks')) {
    return null
  }

  const toggleEventType = (eventType: string) => {
    setEventTypes(prev => 
      prev.includes(eventType) 
        ? prev.filter(e => e !== eventType)
        : [...prev, eventType]
    )
  }

  const handleRegisterWebhook = async () => {
    if (!isConnected || !address || !webhookUrl.trim() || eventTypes.length === 0) return

    try {
      const webhookContent = `WEBHOOK:${webhookUrl}:${eventTypes.join(',')}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: achievementId ? 'addComment' : 'createPost',
        args: achievementId ? [achievementId, webhookContent] : [webhookContent],
      })
    } catch (error) {
      console.error('Webhook registration failed:', error)
    }
  }

  return (
    <AppCard title="🔔 Webhooks" subtitle="Register webhooks for real-time event notifications" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://your-api.com/webhook"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Types</label>
          <div className="space-y-2">
            {['created', 'updated', 'commented', 'liked', 'shared', 'minted'].map(eventType => (
              <label key={eventType} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={eventTypes.includes(eventType)}
                  onChange={() => toggleEventType(eventType)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm capitalize">{eventType}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleRegisterWebhook}
          disabled={isPending || isConfirming || !isConnected || !webhookUrl.trim() || eventTypes.length === 0}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Registering...' : 'Register Webhook'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-pink-50 border border-pink-200 p-3 text-sm text-pink-800">
            ✅ Webhook registered onchain for {eventTypes.length} event type(s)
          </div>
        )}
      </div>
    </AppCard>
  )
}

