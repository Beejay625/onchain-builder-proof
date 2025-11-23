'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementBatchMinting() {
  const { address, isConnected } = useAccount()
  const [achievements, setAchievements] = useState('')
  const [batchSize, setBatchSize] = useState(10)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementBatchMinting')) {
    return null
  }

  const handleBatchMint = async () => {
    if (!isConnected || !address || !achievements.trim()) return

    try {
      const achievementList = achievements.split('\n').filter(Boolean)
      const content = `Batch Minting\nCount: ${achievementList.length}\nBatch Size: ${batchSize}\nAchievements: ${achievementList.join(', ')}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Batch minting failed:', error)
    }
  }

  return (
    <AppCard title="📦 Achievement Batch Minting" subtitle="Mint multiple achievements in one transaction" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Batch Size</label>
          <input
            type="number"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            min={1}
            max={50}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Achievements (one per line)</label>
          <textarea
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
            rows={5}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleBatchMint}
          disabled={isPending || isConfirming || !isConnected || !achievements.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Minting...' : `Batch Mint (${achievements.split('\n').filter(Boolean).length} achievements)`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Batch minting completed onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

