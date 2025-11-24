'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementEnergyReportProps {
  achievementId: bigint
}

export default function OnchainAchievementEnergyReport({ achievementId }: OnchainAchievementEnergyReportProps) {
  const { address, isConnected } = useAccount()
  const [energyDelta, setEnergyDelta] = useState('')
  const [energyOffset, setEnergyOffset] = useState('')
  const [energyNotes, setEnergyNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !energyDelta.trim() || !energyNotes.trim()) return

    try {
      const payload = `ENERGY_REPORT:delta:${energyDelta}:offset:${energyOffset || 'none'}:notes:${energyNotes}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('⚡ Energy Report submission failed:', error)
    }
  }

  return (
    <AppCard title="⚡ Energy Report" subtitle="Estimate carbon or energy deltas" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Energy / Carbon Delta *</label>
          <input
            type="text"
            value={energyDelta}
            onChange={(e) => setEnergyDelta(e.target.value)}
            placeholder="+120 kWh"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Offsets (optional)</label>
          <input
            type="text"
            value={energyOffset}
            onChange={(e) => setEnergyOffset(e.target.value)}
            placeholder="Toucan tonne link"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes *</label>
          <textarea
            value={energyNotes}
            onChange={(e) => setEnergyNotes(e.target.value)}
            placeholder="How was this measured?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !energyDelta.trim() || !energyNotes.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing Energy Report' : 'Publish Energy Report'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Energy report logged
          </div>
        )}
      </div>
    </AppCard>
  )
}
