'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementTreasuryProps {
  achievementId: bigint
}

export default function OnchainAchievementTreasury({ achievementId }: OnchainAchievementTreasuryProps) {
  const { address, isConnected } = useAccount()
  const [contributionAmount, setContributionAmount] = useState('')
  const [contributionPurpose, setContributionPurpose] = useState('')
  const [treasuryAddress, setTreasuryAddress] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const contributeToTreasury = async () => {
    if (!isConnected || !address || !contributionAmount.trim()) return

    try {
      const treasuryData = `TREASURY:amount:${contributionAmount}:purpose:${contributionPurpose || 'N/A'}:address:${treasuryAddress || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, treasuryData],
      })
    } catch (error) {
      console.error('Treasury contribution failed:', error)
    }
  }

  return (
    <AppCard title="🏦 Achievement Treasury" subtitle="Contribute to treasury funds" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Amount *</label>
          <input
            type="text"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
            placeholder="e.g., 0.5 ETH"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Treasury Address (optional)</label>
          <input
            type="text"
            value={treasuryAddress}
            onChange={(e) => setTreasuryAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contribution Purpose (optional)</label>
          <input
            type="text"
            value={contributionPurpose}
            onChange={(e) => setContributionPurpose(e.target.value)}
            placeholder="Why are you contributing?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={contributeToTreasury}
          disabled={isPending || isConfirming || !isConnected || !contributionAmount.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Contributing...' : 'Contribute to Treasury'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Treasury contribution recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

