'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AchievementDelegation() {
  const { address, isConnected } = useAccount()
  const [delegateTo, setDelegateTo] = useState('')
  const [delegationType, setDelegationType] = useState<'voting' | 'management'>('voting')
  const [delegationScope, setDelegationScope] = useState<'all' | 'specific'>('all')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainDelegation')) {
    return null
  }

  const handleDelegate = async () => {
    if (!isConnected || !address || !delegateTo) return

    try {
      const content = `Delegation\nType: ${delegationType}\nDelegate To: ${delegateTo}\nScope: ${delegationScope}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Delegation failed:', error)
    }
  }

  return (
    <AppCard title="👤 Achievement Delegation" subtitle="Delegate voting or management rights" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delegate To Address</label>
          <input
            type="text"
            value={delegateTo}
            onChange={(e) => setDelegateTo(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delegation Type</label>
          <select
            value={delegationType}
            onChange={(e) => setDelegationType(e.target.value as 'voting' | 'management')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="voting">Voting Rights</option>
            <option value="management">Management Rights</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scope</label>
          <select
            value={delegationScope}
            onChange={(e) => setDelegationScope(e.target.value as 'all' | 'specific')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="all">All Achievements</option>
            <option value="specific">Specific Achievements</option>
          </select>
        </div>
        <button
          onClick={handleDelegate}
          disabled={isPending || isConfirming || !isConnected || !delegateTo}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Delegating...' : 'Delegate Rights'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Delegation recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

