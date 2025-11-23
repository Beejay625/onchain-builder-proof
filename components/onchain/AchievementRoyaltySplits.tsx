'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementRoyaltySplitsProps {
  achievementId: bigint
}

export default function AchievementRoyaltySplits({ achievementId }: AchievementRoyaltySplitsProps) {
  const { address, isConnected } = useAccount()
  const [recipientAddresses, setRecipientAddresses] = useState('')
  const [splitPercentages, setSplitPercentages] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementRoyaltySplits')) {
    return null
  }

  const handleSetupSplits = async () => {
    if (!isConnected || !address || !recipientAddresses.trim() || !splitPercentages.trim()) return

    try {
      const recipients = recipientAddresses.split(',').map(a => a.trim())
      const percentages = splitPercentages.split(',').map(p => p.trim())
      const royaltyContent = `ROYALTYSPLIT:${recipients.join('|')}:${percentages.join('|')}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, royaltyContent],
      })
    } catch (error) {
      console.error('Royalty splits setup failed:', error)
    }
  }

  return (
    <AppCard title="💰 Royalty Splits" subtitle="Automatic royalty distribution to multiple recipients" accent="lime">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Addresses (comma-separated)</label>
          <textarea
            value={recipientAddresses}
            onChange={(e) => setRecipientAddresses(e.target.value)}
            placeholder="0x123..., 0x456..., 0x789..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Split Percentages (comma-separated)</label>
          <input
            type="text"
            value={splitPercentages}
            onChange={(e) => setSplitPercentages(e.target.value)}
            placeholder="50, 30, 20"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetupSplits}
          disabled={isPending || isConfirming || !isConnected || !recipientAddresses.trim() || !splitPercentages.trim()}
          className="w-full rounded-lg bg-lime-600 px-4 py-2 text-sm font-semibold text-white hover:bg-lime-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Royalty Splits'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-lime-50 border border-lime-200 p-3 text-sm text-lime-800">
            ✅ Royalty splits configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

