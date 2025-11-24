'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementSupportEscalationProps {
  achievementId: bigint
}

export default function OnchainAchievementSupportEscalation({ achievementId }: OnchainAchievementSupportEscalationProps) {
  const { address, isConnected } = useAccount()
  const [escalationIssue, setEscalationIssue] = useState('')
  const [escalationContact, setEscalationContact] = useState('')
  const [escalationNote, setEscalationNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !escalationIssue.trim() || !escalationContact.trim()) return

    try {
      const payload = `SUPPORT_ESCALATION:issue:${escalationIssue}:contact:${escalationContact}:note:${escalationNote || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🆘 Support Escalation submission failed:', error)
    }
  }

  return (
    <AppCard title="🆘 Support Escalation" subtitle="Track escalations or pager duties" accent="red">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue *</label>
          <input
            type="text"
            value={escalationIssue}
            onChange={(e) => setEscalationIssue(e.target.value)}
            placeholder="Stuck withdrawals"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Responder *</label>
          <input
            type="text"
            value={escalationContact}
            onChange={(e) => setEscalationContact(e.target.value)}
            placeholder="oncall@team"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={escalationNote}
            onChange={(e) => setEscalationNote(e.target.value)}
            placeholder="Mitigation steps"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !escalationIssue.trim() || !escalationContact.trim()}
          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Logging Escalation' : 'Log Escalation'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            ✅ Escalation logged
          </div>
        )}
      </div>
    </AppCard>
  )
}
