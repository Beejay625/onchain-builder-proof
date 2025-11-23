'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementArbitrationProps {
  achievementId: bigint
}

export default function OnchainAchievementArbitration({ achievementId }: OnchainAchievementArbitrationProps) {
  const { address, isConnected } = useAccount()
  const [disputeReason, setDisputeReason] = useState('')
  const [arbitratorAddress, setArbitratorAddress] = useState('')
  const [disputeDetails, setDisputeDetails] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const fileDispute = async () => {
    if (!isConnected || !address || !disputeReason.trim()) return

    try {
      const disputeData = `ARBITRATION:reason:${disputeReason}:arbitrator:${arbitratorAddress || 'N/A'}:details:${disputeDetails || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, disputeData],
      })
    } catch (error) {
      console.error('Dispute filing failed:', error)
    }
  }

  return (
    <AppCard title="⚖️ Achievement Arbitration" subtitle="File dispute for arbitration" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dispute Reason *</label>
          <input
            type="text"
            value={disputeReason}
            onChange={(e) => setDisputeReason(e.target.value)}
            placeholder="What is the dispute about?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Arbitrator Address (optional)</label>
          <input
            type="text"
            value={arbitratorAddress}
            onChange={(e) => setArbitratorAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dispute Details (optional)</label>
          <textarea
            value={disputeDetails}
            onChange={(e) => setDisputeDetails(e.target.value)}
            placeholder="Provide additional context..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={fileDispute}
          disabled={isPending || isConfirming || !isConnected || !disputeReason.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Filing...' : 'File Dispute'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Dispute filed onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

