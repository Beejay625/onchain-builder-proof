'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementNetworkSignalProps {
  achievementId: bigint
}

export default function OnchainAchievementNetworkSignal({ achievementId }: OnchainAchievementNetworkSignalProps) {
  const { address, isConnected } = useAccount()
  const [networkName, setNetworkName] = useState('')
  const [networkHealth, setNetworkHealth] = useState('')
  const [networkDetail, setNetworkDetail] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !networkName.trim() || !networkHealth.trim()) return

    try {
      const payload = `NETWORK_SIGNAL:network:${networkName}:health:${networkHealth}:detail:${networkDetail || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('📡 Network Signal submission failed:', error)
    }
  }

  return (
    <AppCard title="📡 Network Signal" subtitle="Share network health or analytics" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Network *</label>
          <input
            type="text"
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
            placeholder="Base"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Health Metric *</label>
          <input
            type="text"
            value={networkHealth}
            onChange={(e) => setNetworkHealth(e.target.value)}
            placeholder="99.9% uptime"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Detail (optional)</label>
          <textarea
            value={networkDetail}
            onChange={(e) => setNetworkDetail(e.target.value)}
            placeholder="Latency, finality"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !networkName.trim() || !networkHealth.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing Network Signal' : 'Publish Network Signal'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Network signal logged
          </div>
        )}
      </div>
    </AppCard>
  )
}
