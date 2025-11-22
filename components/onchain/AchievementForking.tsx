'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementForkingProps {
  originalAchievementId: bigint
  originalAuthor: string
}

export default function AchievementForking({ originalAchievementId, originalAuthor }: AchievementForkingProps) {
  const { address, isConnected } = useAccount()
  const [forkDescription, setForkDescription] = useState('')
  const [attributionNote, setAttributionNote] = useState(`Forked from achievement #${originalAchievementId.toString()} by ${originalAuthor}`)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementForking')) {
    return null
  }

  const handleFork = async () => {
    if (!isConnected || !address || !forkDescription.trim()) return

    try {
      const forkContent = `${forkDescription}\n\n${attributionNote}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [forkContent],
      })
    } catch (error) {
      console.error('Fork failed:', error)
    }
  }

  return (
    <AppCard title="🍴 Fork Achievement" subtitle="Create derivative achievement with attribution" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fork Description</label>
          <textarea
            value={forkDescription}
            onChange={(e) => setForkDescription(e.target.value)}
            placeholder="Describe your fork..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attribution</label>
          <input
            type="text"
            value={attributionNote}
            onChange={(e) => setAttributionNote(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleFork}
          disabled={isPending || isConfirming || !isConnected || !forkDescription.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Forking...' : 'Fork Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Fork created onchain with attribution
          </div>
        )}
      </div>
    </AppCard>
  )
}

