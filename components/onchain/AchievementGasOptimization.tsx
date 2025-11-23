'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState, useEffect } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { formatEther } from 'viem'

interface AchievementGasOptimizationProps {
  achievementId?: bigint
}

export default function AchievementGasOptimization({ achievementId }: AchievementGasOptimizationProps) {
  const { address, isConnected } = useAccount()
  const [gasUsed, setGasUsed] = useState('')
  const [optimizationNote, setOptimizationNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementGasOptimization')) {
    return null
  }

  const handleRecordGas = async () => {
    if (!isConnected || !address || !gasUsed.trim()) return

    try {
      const gasContent = `GASOPT:${gasUsed}:${optimizationNote || 'N/A'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: achievementId ? 'addComment' : 'createPost',
        args: achievementId ? [achievementId, gasContent] : [gasContent],
      })
    } catch (error) {
      console.error('Gas optimization recording failed:', error)
    }
  }

  return (
    <AppCard title="⛽ Gas Optimization" subtitle="Track and optimize gas usage" accent="zinc">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gas Used</label>
          <input
            type="number"
            value={gasUsed}
            onChange={(e) => setGasUsed(e.target.value)}
            placeholder="e.g., 21000"
            min="0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Optimization Note (Optional)</label>
          <textarea
            value={optimizationNote}
            onChange={(e) => setOptimizationNote(e.target.value)}
            placeholder="Describe optimization techniques used..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordGas}
          disabled={isPending || isConfirming || !isConnected || !gasUsed.trim()}
          className="w-full rounded-lg bg-zinc-600 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Gas Usage'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3 text-sm text-zinc-800">
            ✅ Gas usage recorded onchain: {gasUsed} gas units
          </div>
        )}
      </div>
    </AppCard>
  )
}

