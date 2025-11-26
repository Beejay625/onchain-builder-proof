'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementTreasuryAlertProps {
  achievementId: bigint
}

export default function OnchainAchievementTreasuryAlert({ achievementId }: OnchainAchievementTreasuryAlertProps) {
  const { address, isConnected } = useAccount()
  const [alertThreshold, setAlertThreshold] = useState('')
  const [alertStatus, setAlertStatus] = useState<'info' | 'warning' | 'critical'>('info')
  const [alertNotes, setAlertNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const publishAlert = async () => {
    if (!isConnected || !address || !alertThreshold.trim()) return

    try {
      const payload = `TREASURY_ALERT:threshold:${alertThreshold}:status:${alertStatus}:note:${alertNotes || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Treasury alert failed:', error)
    }
  }

  return (
    <AppCard title="🏦 Treasury Alert" subtitle="Share treasury health signals" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Threshold / Context *</label>
          <input
            type="text"
            value={alertThreshold}
            onChange={(e) => setAlertThreshold(e.target.value)}
            placeholder="Runway < 12 months, holdings < 500 ETH"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alert Level</label>
          <select
            value={alertStatus}
            onChange={(e) => setAlertStatus(e.target.value as typeof alertStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={alertNotes}
            onChange={(e) => setAlertNotes(e.target.value)}
            rows={3}
            placeholder="Need top-up, rebalancing in progress"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={publishAlert}
          disabled={isPending || isConfirming || !isConnected || !alertThreshold.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Treasury Alert'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Treasury alert recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
