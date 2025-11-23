'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementCloningProps {
  achievementId: bigint
}

export default function OnchainAchievementCloning({ achievementId }: OnchainAchievementCloningProps) {
  const { address, isConnected } = useAccount()
  const [cloneVariation, setCloneVariation] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const { data: originalPost } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const cloneAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const cloneContent = `CLONE:${achievementId}:${originalPost?.content || ''}\n\nVariation: ${cloneVariation || 'Exact clone'}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [cloneContent],
      })
    } catch (error) {
      console.error('Cloning failed:', error)
    }
  }

  return (
    <AppCard title="🧬 Clone Achievement" subtitle="Create exact copy or variation" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variation Note (optional)</label>
          <textarea
            value={cloneVariation}
            onChange={(e) => setCloneVariation(e.target.value)}
            placeholder="Describe any variations from original..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={cloneAchievement}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Cloning...' : 'Clone Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Achievement cloned onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

