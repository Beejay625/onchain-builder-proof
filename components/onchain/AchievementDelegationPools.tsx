'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementDelegationPoolsProps {
  proposalId: bigint
}

export default function AchievementDelegationPools({ proposalId }: AchievementDelegationPoolsProps) {
  const { address, isConnected } = useAccount()
  const [poolName, setPoolName] = useState('')
  const [minDelegation, setMinDelegation] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementDelegationPools')) {
    return null
  }

  const handleCreatePool = async () => {
    if (!isConnected || !address || !poolName.trim() || !minDelegation.trim()) return

    try {
      const poolContent = `DELEGATIONPOOL:${poolName}:MIN${minDelegation}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [proposalId, poolContent],
      })
    } catch (error) {
      console.error('Delegation pool creation failed:', error)
    }
  }

  return (
    <AppCard title="🏊 Delegation Pools" subtitle="Pool delegation for efficient voting" accent="sky">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pool Name</label>
          <input
            type="text"
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
            placeholder="e.g., Builder Alliance Pool"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Delegation (ETH)</label>
          <input
            type="number"
            value={minDelegation}
            onChange={(e) => setMinDelegation(e.target.value)}
            placeholder="e.g., 0.1"
            step="0.001"
            min="0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreatePool}
          disabled={isPending || isConfirming || !isConnected || !poolName.trim() || !minDelegation.trim()}
          className="w-full rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating Pool...' : 'Create Delegation Pool'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 text-sm text-sky-800">
            ✅ Delegation pool created onchain: {poolName}
          </div>
        )}
      </div>
    </AppCard>
  )
}

