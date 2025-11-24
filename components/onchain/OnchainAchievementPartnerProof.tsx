'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementPartnerProofProps {
  achievementId: bigint
}

export default function OnchainAchievementPartnerProof({ achievementId }: OnchainAchievementPartnerProofProps) {
  const { address, isConnected } = useAccount()
  const [partnerName, setPartnerName] = useState('')
  const [partnerType, setPartnerType] = useState('')
  const [partnerLink, setPartnerLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !partnerName.trim() || !partnerType.trim()) return

    try {
      const payload = `PARTNER_PROOF:partner:${partnerName}:type:${partnerType}:link:${partnerLink || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🤝 Partner Proof submission failed:', error)
    }
  }

  return (
    <AppCard title="🤝 Partner Proof" subtitle="Validate collaborations or integrations" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Partner Name *</label>
          <input
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Base Ecosystem"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Partner Type *</label>
          <input
            type="text"
            value={partnerType}
            onChange={(e) => setPartnerType(e.target.value)}
            placeholder="Integration"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Link (optional)</label>
          <input
            type="text"
            value={partnerLink}
            onChange={(e) => setPartnerLink(e.target.value)}
            placeholder="Tweet, doc"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !partnerName.trim() || !partnerType.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording Partner' : 'Record Partner'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Partner proof logged
          </div>
        )}
      </div>
    </AppCard>
  )
}
