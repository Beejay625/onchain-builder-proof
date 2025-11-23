'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementChainsProps {
  achievementId: bigint
}

export default function AchievementChains({ achievementId }: AchievementChainsProps) {
  const { address, isConnected } = useAccount()
  const [previousAchievementId, setPreviousAchievementId] = useState('')
  const [chainDescription, setChainDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementChains')) {
    return null
  }

  const handleLinkChain = async () => {
    if (!isConnected || !address || !previousAchievementId.trim()) return

    try {
      const chainContent = `ACHIEVEMENTCHAIN:${previousAchievementId}:${chainDescription || 'Sequential achievement'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, chainContent],
      })
    } catch (error) {
      console.error('Achievement chain linking failed:', error)
    }
  }

  return (
    <AppCard title="⛓️ Achievement Chains" subtitle="Link sequential achievements together" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Previous Achievement ID</label>
          <input
            type="number"
            value={previousAchievementId}
            onChange={(e) => setPreviousAchievementId(e.target.value)}
            placeholder="e.g., 123"
            min="1"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chain Description (Optional)</label>
          <textarea
            value={chainDescription}
            onChange={(e) => setChainDescription(e.target.value)}
            placeholder="Describe how this achievement continues the chain..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleLinkChain}
          disabled={isPending || isConfirming || !isConnected || !previousAchievementId.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Linking...' : 'Link Achievement Chain'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Achievement linked onchain to achievement #{previousAchievementId}
          </div>
        )}
      </div>
    </AppCard>
  )
}

