'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementSecurityExceptionProps {
  achievementId: bigint
}

export default function OnchainAchievementSecurityException({ achievementId }: OnchainAchievementSecurityExceptionProps) {
  const { address, isConnected } = useAccount()
  const [exceptionDetail, setExceptionDetail] = useState('')
  const [exceptionReason, setExceptionReason] = useState('')
  const [exceptionExpiry, setExceptionExpiry] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordException = async () => {
    if (!isConnected || !address || !exceptionDetail.trim() || !exceptionReason.trim()) return

    try {
      const payload = `SECURITY_EXCEPTION:detail:${exceptionDetail}:reason:${exceptionReason}:expiry:${exceptionExpiry || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Security exception logging failed:', error)
    }
  }

  return (
    <AppCard title="🚫 Security Exception" subtitle="Document approved security exceptions" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exception Detail *</label>
          <textarea
            value={exceptionDetail}
            onChange={(e) => setExceptionDetail(e.target.value)}
            rows={3}
            placeholder="Temporary allowlist, key escrow, bypass"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
          <textarea
            value={exceptionReason}
            onChange={(e) => setExceptionReason(e.target.value)}
            rows={2}
            placeholder="Pending HSM deploy, time-critical release"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry (optional)</label>
          <input
            type="date"
            value={exceptionExpiry}
            onChange={(e) => setExceptionExpiry(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordException}
          disabled={isPending || isConfirming || !isConnected || !exceptionDetail.trim() || !exceptionReason.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Security Exception'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Security exception recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
