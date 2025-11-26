'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementPartnerCommitmentProps {
  achievementId: bigint
}

export default function OnchainAchievementPartnerCommitment({ achievementId }: OnchainAchievementPartnerCommitmentProps) {
  const { address, isConnected } = useAccount()
  const [partnerName, setPartnerName] = useState('')
  const [deliverable, setDeliverable] = useState('')
  const [dueDate, setDueDate] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordCommitment = async () => {
    if (!isConnected || !address || !partnerName.trim() || !deliverable.trim()) return

    try {
      const payload = `PARTNER_COMMIT:partner:${partnerName}:deliverable:${deliverable}:due:${dueDate || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Partner commitment logging failed:', error)
    }
  }

  return (
    <AppCard title="🤝 Partner Commitment" subtitle="Document partner pledges and deliverables" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Partner Name *</label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Galxe, Layer3, Reown"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deliverable *</label>
          <textarea
            value={deliverable}
            onChange={(e) => setDeliverable(e.target.value)}
            rows={3}
            placeholder="Co-marketing push, contract audit, liquidity support"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Due Date (optional)</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordCommitment}
          disabled={isPending || isConfirming || !isConnected || !partnerName.trim() || !deliverable.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Partner Commitment'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Partner commitment recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
