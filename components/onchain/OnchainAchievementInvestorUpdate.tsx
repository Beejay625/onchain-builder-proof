'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementInvestorUpdateProps {
  achievementId: bigint
}

export default function OnchainAchievementInvestorUpdate({ achievementId }: OnchainAchievementInvestorUpdateProps) {
  const { address, isConnected } = useAccount()
  const [headlineSummary, setHeadlineSummary] = useState('')
  const [headlineMetrics, setHeadlineMetrics] = useState('')
  const [nextFocus, setNextFocus] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const publishUpdate = async () => {
    if (!isConnected || !address || !headlineSummary.trim()) return

    try {
      const payload = `INVESTOR_UPDATE:summary:${headlineSummary}:metrics:${headlineMetrics || 'n/a'}:next:${nextFocus || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Investor update failed:', error)
    }
  }

  return (
    <AppCard title="📨 Investor Update" subtitle="Anchor investor memo highlights" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Headline Summary *</label>
          <textarea
            value={headlineSummary}
            onChange={(e) => setHeadlineSummary(e.target.value)}
            rows={3}
            placeholder="Key wins, risks, asks"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Headline Metrics (optional)</label>
          <input
            type="text"
            value={headlineMetrics}
            onChange={(e) => setHeadlineMetrics(e.target.value)}
            placeholder="MAU +45%, GMV $40k"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Next Focus (optional)</label>
          <input
            type="text"
            value={nextFocus}
            onChange={(e) => setNextFocus(e.target.value)}
            placeholder="Ship mobile, finalize L2 launch"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={publishUpdate}
          disabled={isPending || isConfirming || !isConnected || !headlineSummary.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Investor Update'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Investor update anchored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
