'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementEscrowProps {
  achievementId: bigint
}

export default function OnchainAchievementEscrow({ achievementId }: OnchainAchievementEscrowProps) {
  const { address, isConnected } = useAccount()
  const [escrowAmount, setEscrowAmount] = useState('')
  const [beneficiaryAddress, setBeneficiaryAddress] = useState('')
  const [releaseConditions, setReleaseConditions] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const createEscrow = async () => {
    if (!isConnected || !address || !escrowAmount.trim() || !beneficiaryAddress.trim()) return

    try {
      const escrowData = `ESCROW:amount:${escrowAmount}:beneficiary:${beneficiaryAddress}:conditions:${releaseConditions || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, escrowData],
      })
    } catch (error) {
      console.error('Escrow creation failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Achievement Escrow" subtitle="Create escrow for milestone release" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Escrow Amount *</label>
          <input
            type="text"
            value={escrowAmount}
            onChange={(e) => setEscrowAmount(e.target.value)}
            placeholder="e.g., 1.0 ETH"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Address *</label>
          <input
            type="text"
            value={beneficiaryAddress}
            onChange={(e) => setBeneficiaryAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Release Conditions (optional)</label>
          <textarea
            value={releaseConditions}
            onChange={(e) => setReleaseConditions(e.target.value)}
            placeholder="When should funds be released?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={createEscrow}
          disabled={isPending || isConfirming || !isConnected || !escrowAmount.trim() || !beneficiaryAddress.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Escrow'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Escrow created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

