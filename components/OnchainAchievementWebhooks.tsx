'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementWebhooks() {
  const { address } = useAccount()
  const [webhookUrl, setWebhookUrl] = useState('')
  const [eventType, setEventType] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const registerWebhook = async () => {
    if (!address || !webhookUrl || !eventType) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`WEBHOOK:${eventType}:${webhookUrl}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔔 Webhooks</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Webhook URL"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select event type</option>
          <option value="post_created">Post Created</option>
          <option value="comment_added">Comment Added</option>
          <option value="reaction_added">Reaction Added</option>
          <option value="profile_updated">Profile Updated</option>
        </select>
        <button
          onClick={registerWebhook}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Registering...' : 'Register Webhook'}
        </button>
        {isSuccess && <p className="text-green-600">Webhook registered onchain!</p>}
      </div>
    </div>
  )
}




