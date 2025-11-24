'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementLiquidityMiningProps {
  achievementId: bigint
}

export default function AchievementLiquidityMining({ achievementId }: AchievementLiquidityMiningProps) {
  const { address, isConnected } = useAccount()
  const [programName, setProgramName] = useState('Base Builders LM')
  const [rewardsEarned, setRewardsEarned] = useState('0')
  const [durationWeeks, setDurationWeeks] = useState('4')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementLiquidityMining')) {
    return null
  }

  const handleRecordProgram = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Liquidity Mining\nAchievement: #${achievementId.toString()}\nProgram: ${programName}\nRewards: ${rewardsEarned}\nDuration (weeks): ${durationWeeks}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Liquidity mining log failed:', error)
    }
  }

  return (
    <AppCard title="🌊 Liquidity Mining" subtitle="Track liquidity mining campaigns and rewards" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Program Name</label>
          <input
            type="text"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rewards Earned</label>
            <input
              type="text"
              value={rewardsEarned}
              onChange={(e) => setRewardsEarned(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (weeks)</label>
            <input
              type="text"
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleRecordProgram}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Liquidity Mining'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Liquidity mining recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

