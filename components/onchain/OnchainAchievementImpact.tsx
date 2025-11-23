'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementImpactProps {
  achievementId: bigint
}

export default function OnchainAchievementImpact({ achievementId }: OnchainAchievementImpactProps) {
  const { address, isConnected } = useAccount()
  const [impactMetrics, setImpactMetrics] = useState({
    usersAffected: '',
    revenueImpact: '',
    timeSaved: '',
    impactDescription: '',
  })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const { data: post } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const recordImpact = async () => {
    if (!isConnected || !address || !impactMetrics.impactDescription.trim()) return

    try {
      const impactData = `IMPACT:users:${impactMetrics.usersAffected || 'N/A'}:revenue:${impactMetrics.revenueImpact || 'N/A'}:time:${impactMetrics.timeSaved || 'N/A'}:desc:${impactMetrics.impactDescription}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, impactData],
      })
    } catch (error) {
      console.error('Impact recording failed:', error)
    }
  }

  return (
    <AppCard title="📊 Achievement Impact" subtitle="Record real-world impact metrics" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Users Affected (optional)</label>
          <input
            type="text"
            value={impactMetrics.usersAffected}
            onChange={(e) => setImpactMetrics({ ...impactMetrics, usersAffected: e.target.value })}
            placeholder="e.g., 1000 users"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Revenue Impact (optional)</label>
          <input
            type="text"
            value={impactMetrics.revenueImpact}
            onChange={(e) => setImpactMetrics({ ...impactMetrics, revenueImpact: e.target.value })}
            placeholder="e.g., $10k saved"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Saved (optional)</label>
          <input
            type="text"
            value={impactMetrics.timeSaved}
            onChange={(e) => setImpactMetrics({ ...impactMetrics, timeSaved: e.target.value })}
            placeholder="e.g., 50 hours/week"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Impact Description *</label>
          <textarea
            value={impactMetrics.impactDescription}
            onChange={(e) => setImpactMetrics({ ...impactMetrics, impactDescription: e.target.value })}
            placeholder="Describe the real-world impact..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={recordImpact}
          disabled={isPending || isConfirming || !isConnected || !impactMetrics.impactDescription.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Impact'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Impact metrics recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

