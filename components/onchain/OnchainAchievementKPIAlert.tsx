'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementKPIAlertProps {
  achievementId: bigint
}

export default function OnchainAchievementKPIAlert({ achievementId }: OnchainAchievementKPIAlertProps) {
  const { address, isConnected } = useAccount()
  const [kpiName, setKpiName] = useState('')
  const [kpiThreshold, setKpiThreshold] = useState('')
  const [alertDirection, setAlertDirection] = useState<'above' | 'below'>('above')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const publishAlert = async () => {
    if (!isConnected || !address || !kpiName.trim() || !kpiThreshold.trim()) return

    try {
      const payload = `KPI_ALERT:name:${kpiName}:threshold:${kpiThreshold}:direction:${alertDirection}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('KPI alert logging failed:', error)
    }
  }

  return (
    <AppCard title="📈 KPI Alert" subtitle="Broadcast KPI threshold breaches" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">KPI Name *</label>
          <input
            type="text"
            value={kpiName}
            onChange={(e) => setKpiName(e.target.value)}
            placeholder="Daily active wallets"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Threshold *</label>
          <input
            type="text"
            value={kpiThreshold}
            onChange={(e) => setKpiThreshold(e.target.value)}
            placeholder="> 5,000"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
          <select
            value={alertDirection}
            onChange={(e) => setAlertDirection(e.target.value as typeof alertDirection)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
        </div>
        <button
          onClick={publishAlert}
          disabled={isPending || isConfirming || !isConnected || !kpiName.trim() || !kpiThreshold.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish KPI Alert'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ KPI alert recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
