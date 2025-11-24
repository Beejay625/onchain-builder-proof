'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementSupporterRegistryProps {
  achievementId: bigint
}

export default function OnchainAchievementSupporterRegistry({ achievementId }: OnchainAchievementSupporterRegistryProps) {
  const { address, isConnected } = useAccount()
  const [supporterWallet, setSupporterWallet] = useState('')
  const [supporterRole, setSupporterRole] = useState('')
  const [supporterNote, setSupporterNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !supporterWallet.trim() || !supporterRole.trim()) return

    try {
      const payload = `SUPPORTER:wallet:${supporterWallet}:role:${supporterRole}:note:${supporterNote || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🤝 Supporter Registry submission failed:', error)
    }
  }

  return (
    <AppCard title="🤝 Supporter Registry" subtitle="List wallets or orgs backing this shipment" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Supporter Wallet *</label>
          <input
            type="text"
            value={supporterWallet}
            onChange={(e) => setSupporterWallet(e.target.value)}
            placeholder="0xabc..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role / Contribution *</label>
          <input
            type="text"
            value={supporterRole}
            onChange={(e) => setSupporterRole(e.target.value)}
            placeholder="Design partner"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Note (optional)</label>
          <textarea
            value={supporterNote}
            onChange={(e) => setSupporterNote(e.target.value)}
            placeholder="Add gratitude"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !supporterWallet.trim() || !supporterRole.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording Supporter' : 'Record Supporter'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Supporter recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}
