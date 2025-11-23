'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementTransferProps {
  achievementId: bigint
}

export default function OnchainAchievementTransfer({ achievementId }: OnchainAchievementTransferProps) {
  const { address, isConnected } = useAccount()
  const [recipientAddress, setRecipientAddress] = useState('')
  const [transferNote, setTransferNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const transferAchievement = async () => {
    if (!isConnected || !address || !recipientAddress.trim()) return

    try {
      const transferData = `TRANSFER:${recipientAddress}:${transferNote || 'Achievement transferred'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, transferData],
      })
    } catch (error) {
      console.error('Transfer failed:', error)
    }
  }

  return (
    <AppCard title="🔄 Achievement Transfer" subtitle="Transfer achievement ownership" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address *</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Note (optional)</label>
          <input
            type="text"
            value={transferNote}
            onChange={(e) => setTransferNote(e.target.value)}
            placeholder="Add a note about the transfer..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={transferAchievement}
          disabled={isPending || isConfirming || !isConnected || !recipientAddress.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Transferring...' : 'Transfer Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Transfer recorded onchain to {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
          </div>
        )}
      </div>
    </AppCard>
  )
}

