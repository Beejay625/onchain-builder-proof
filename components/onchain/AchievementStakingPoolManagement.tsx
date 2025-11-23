'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementStakingPoolManagementProps {
  achievementId: bigint
}

export default function AchievementStakingPoolManagement({ achievementId }: AchievementStakingPoolManagementProps) {
  const { address, isConnected } = useAccount()
  const [poolName, setPoolName] = useState('')
  const [totalStaked, setTotalStaked] = useState('')
  const [apy, setApy] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementStakingPoolManagement')) {
    return null
  }

  const handleCreatePool = async () => {
    if (!isConnected || !address || !poolName.trim() || !totalStaked.trim()) return

    try {
      const content = `Staking Pool Management\nAchievement: #${achievementId.toString()}\nPool: ${poolName}\nTotal Staked: ${totalStaked}${apy ? `\nAPY: ${apy}%` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Pool creation failed:', error)
    }
  }

  return (
    <AppCard title="🏊 Achievement Staking Pool Management" subtitle="Record staking pool configurations and metrics" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pool Name</label>
          <input
            type="text"
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
            placeholder="My Staking Pool"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Staked</label>
          <input
            type="text"
            value={totalStaked}
            onChange={(e) => setTotalStaked(e.target.value)}
            placeholder="1000000"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">APY (%) (optional)</label>
          <input
            type="text"
            value={apy}
            onChange={(e) => setApy(e.target.value)}
            placeholder="5.0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreatePool}
          disabled={isPending || isConfirming || !isConnected || !poolName.trim() || !totalStaked.trim()}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Staking Pool'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Staking pool created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

