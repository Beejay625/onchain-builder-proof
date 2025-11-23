'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementSponsorshipProps {
  achievementId: bigint
}

export default function OnchainAchievementSponsorship({ achievementId }: OnchainAchievementSponsorshipProps) {
  const { address, isConnected } = useAccount()
  const [sponsorAddress, setSponsorAddress] = useState('')
  const [sponsorAmount, setSponsorAmount] = useState('')
  const [sponsorNote, setSponsorNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const sponsorAchievement = async () => {
    if (!isConnected || !address || !sponsorAddress.trim()) return

    try {
      const sponsorshipData = `SPONSORSHIP:sponsor:${sponsorAddress}:amount:${sponsorAmount || '0'}:note:${sponsorNote || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, sponsorshipData],
      })
    } catch (error) {
      console.error('Sponsorship failed:', error)
    }
  }

  return (
    <AppCard title="💰 Achievement Sponsorship" subtitle="Sponsor achievement with contribution" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sponsor Address *</label>
          <input
            type="text"
            value={sponsorAddress}
            onChange={(e) => setSponsorAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sponsor Amount (optional)</label>
          <input
            type="text"
            value={sponsorAmount}
            onChange={(e) => setSponsorAmount(e.target.value)}
            placeholder="e.g., 0.1 ETH"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sponsor Note (optional)</label>
          <input
            type="text"
            value={sponsorNote}
            onChange={(e) => setSponsorNote(e.target.value)}
            placeholder="Why are you sponsoring?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={sponsorAchievement}
          disabled={isPending || isConfirming || !isConnected || !sponsorAddress.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Sponsoring...' : 'Sponsor Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Sponsorship recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

