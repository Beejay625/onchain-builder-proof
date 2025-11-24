'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementUpdateChannelProps {
  achievementId: bigint
}

export default function OnchainAchievementUpdateChannel({ achievementId }: OnchainAchievementUpdateChannelProps) {
  const { address, isConnected } = useAccount()
  const [channelType, setChannelType] = useState<'newsletter' | 'discord' | 'x' | 'other'>('newsletter')
  const [channelUrl, setChannelUrl] = useState('')
  const [channelCadence, setChannelCadence] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const saveChannel = async () => {
    if (!isConnected || !address || !channelUrl.trim()) return

    try {
      const payload = `UPDATE_CHANNEL:type:${channelType}:url:${channelUrl}:cadence:${channelCadence || 'adhoc'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Update channel failed:', error)
    }
  }

  return (
    <AppCard title="📣 Update Channel" subtitle="Link status feeds or broadcast channels" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel Type</label>
          <select
            value={channelType}
            onChange={(e) => setChannelType(e.target.value as typeof channelType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="newsletter">Newsletter</option>
            <option value="discord">Discord</option>
            <option value="x">X / Twitter</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel URL *</label>
          <input
            type="text"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            placeholder="https://mirror.xyz/..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cadence (optional)</label>
          <input
            type="text"
            value={channelCadence}
            onChange={(e) => setChannelCadence(e.target.value)}
            placeholder="Weekly, async, alerts"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={saveChannel}
          disabled={isPending || isConfirming || !isConnected || !channelUrl.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Saving...' : 'Record Update Channel'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Update channel stored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
