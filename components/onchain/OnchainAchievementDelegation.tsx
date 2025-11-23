'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementDelegationProps {
  achievementId: bigint
}

export default function OnchainAchievementDelegation({ achievementId }: OnchainAchievementDelegationProps) {
  const { address, isConnected } = useAccount()
  const [delegateAddress, setDelegateAddress] = useState('')
  const [delegationType, setDelegationType] = useState<'voting' | 'management' | 'full'>('voting')
  const [delegationExpiry, setDelegationExpiry] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const delegateRights = async () => {
    if (!isConnected || !address || !delegateAddress.trim()) return

    try {
      const expiryTimestamp = delegationExpiry ? Math.floor(new Date(delegationExpiry).getTime() / 1000) : 0
      const delegationData = `DELEGATION:delegate:${delegateAddress}:type:${delegationType}:expiry:${expiryTimestamp}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, delegationData],
      })
    } catch (error) {
      console.error('Delegation failed:', error)
    }
  }

  return (
    <AppCard title="👤 Achievement Delegation" subtitle="Delegate rights to another address" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delegate Address *</label>
          <input
            type="text"
            value={delegateAddress}
            onChange={(e) => setDelegateAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delegation Type</label>
          <select
            value={delegationType}
            onChange={(e) => setDelegationType(e.target.value as typeof delegationType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="voting">Voting Only</option>
            <option value="management">Management Only</option>
            <option value="full">Full Rights</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (optional)</label>
          <input
            type="datetime-local"
            value={delegationExpiry}
            onChange={(e) => setDelegationExpiry(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={delegateRights}
          disabled={isPending || isConfirming || !isConnected || !delegateAddress.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
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

