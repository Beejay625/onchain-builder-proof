'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementReportingProps {
  achievementId: bigint
}

export default function OnchainAchievementReporting({ achievementId }: OnchainAchievementReportingProps) {
  const { address, isConnected } = useAccount()
  const [reportReason, setReportReason] = useState('')
  const [reportType, setReportType] = useState<'spam' | 'inappropriate' | 'misinformation' | 'other'>('other')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const reportAchievement = async () => {
    if (!isConnected || !address || !reportReason.trim()) return

    try {
      const reportData = `REPORT:type:${reportType}:reason:${reportReason}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, reportData],
      })
    } catch (error) {
      console.error('Reporting failed:', error)
    }
  }

  return (
    <AppCard title="🚨 Achievement Reporting" subtitle="Report inappropriate achievements" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as typeof reportType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="spam">Spam</option>
            <option value="inappropriate">Inappropriate</option>
            <option value="misinformation">Misinformation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Reason *</label>
          <textarea
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            placeholder="Why are you reporting this achievement?"
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={reportAchievement}
          disabled={isPending || isConfirming || !isConnected || !reportReason.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Reporting...' : 'Report Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Report submitted onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

