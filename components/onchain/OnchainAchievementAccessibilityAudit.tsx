'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementAccessibilityAuditProps {
  achievementId: bigint
}

export default function OnchainAchievementAccessibilityAudit({ achievementId }: OnchainAchievementAccessibilityAuditProps) {
  const { address, isConnected } = useAccount()
  const [auditScope, setAuditScope] = useState('')
  const [auditFindings, setAuditFindings] = useState('')
  const [remediationStatus, setRemediationStatus] = useState<'open' | 'in-progress' | 'resolved'>('open')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const logAudit = async () => {
    if (!isConnected || !address || !auditScope.trim() || !auditFindings.trim()) return

    try {
      const payload = `ACCESSIBILITY_AUDIT:scope:${auditScope}:findings:${auditFindings}:status:${remediationStatus}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Accessibility audit logging failed:', error)
    }
  }

  return (
    <AppCard title="♿ Accessibility Audit" subtitle="Document accessibility reviews and fixes" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Audit Scope *</label>
          <input
            type="text"
            value={auditScope}
            onChange={(e) => setAuditScope(e.target.value)}
            placeholder="Dashboard forms, wallet modals"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Key Findings *</label>
          <textarea
            value={auditFindings}
            onChange={(e) => setAuditFindings(e.target.value)}
            rows={3}
            placeholder="Contrast issues, missing aria tags, focus states"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Remediation Status</label>
          <select
            value={remediationStatus}
            onChange={(e) => setRemediationStatus(e.target.value as typeof remediationStatus)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <button
          onClick={logAudit}
          disabled={isPending || isConfirming || !isConnected || !auditScope.trim() || !auditFindings.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging...' : 'Log Accessibility Audit'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Accessibility audit stored onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
