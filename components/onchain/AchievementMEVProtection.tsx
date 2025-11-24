'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementMEVProtectionProps {
  achievementId: bigint
}

export default function AchievementMEVProtection({ achievementId }: AchievementMEVProtectionProps) {
  const { address, isConnected } = useAccount()
  const [protectionType, setProtectionType] = useState<'private-mempool' | 'rpc' | 'bundle'>('private-mempool')
  const [savings, setSavings] = useState('0.00')
  const [notes, setNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementMEVProtection')) {
    return null
  }

  const handleRecordProtection = async () => {
    if (!isConnected || !address) return

    try {
      const content = `MEV Protection\nAchievement: #${achievementId.toString()}\nType: ${protectionType}\nSavings: ${savings}${notes ? `\nNotes: ${notes}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('MEV protection log failed:', error)
    }
  }

  return (
    <AppCard title="🛡️ MEV Protection" subtitle="Capture MEV protection strategies and saved amounts" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Protection Type</label>
          <select
            value={protectionType}
            onChange={(e) => setProtectionType(e.target.value as 'private-mempool' | 'rpc' | 'bundle')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="private-mempool">Private Mempool</option>
            <option value="rpc">MEV-Resistant RPC</option>
            <option value="bundle">Bundle Submission</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Savings (USD)</label>
            <input
              type="text"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleRecordProtection}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record MEV Protection'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ MEV protection recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

