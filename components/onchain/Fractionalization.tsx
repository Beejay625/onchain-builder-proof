'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface FractionalizationProps {
  achievementId: bigint
}

export default function Fractionalization({ achievementId }: FractionalizationProps) {
  const { address, isConnected } = useAccount()
  const [totalShares, setTotalShares] = useState('100')
  const [sharePrice, setSharePrice] = useState('0.01')
  const [fractionalizationDescription, setFractionalizationDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainFractionalization')) {
    return null
  }

  const handleFractionalize = async () => {
    if (!isConnected || !address || !totalShares || !sharePrice) return

    try {
      const content = `Achievement Fractionalization\nAchievement: #${achievementId.toString()}\nTotal Shares: ${totalShares}\nShare Price: ${sharePrice} ETH${fractionalizationDescription ? `\nDescription: ${fractionalizationDescription}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Fractionalization failed:', error)
    }
  }

  return (
    <AppCard title="🔢 Fractionalization" subtitle="Fractionalize achievements into shares" accent="violet">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Shares</label>
          <input
            type="text"
            value={totalShares}
            onChange={(e) => setTotalShares(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Share Price (ETH)</label>
          <input
            type="number"
            value={sharePrice}
            onChange={(e) => setSharePrice(e.target.value)}
            min="0.001"
            step="0.001"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <textarea
            value={fractionalizationDescription}
            onChange={(e) => setFractionalizationDescription(e.target.value)}
            placeholder="Why fractionalize this achievement?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleFractionalize}
          disabled={isPending || isConfirming || !isConnected || !totalShares || !sharePrice}
          className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Fractionalizing...' : 'Fractionalize Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Fractionalization recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

