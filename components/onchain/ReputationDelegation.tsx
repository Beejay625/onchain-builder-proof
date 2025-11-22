'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ReputationDelegation() {
  const { address, isConnected } = useAccount()
  const [delegateTo, setDelegateTo] = useState('')
  const [delegationAmount, setDelegationAmount] = useState('100')
  const [delegationReason, setDelegationReason] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainReputationDelegation')) {
    return null
  }

  const handleDelegate = async () => {
    if (!isConnected || !address || !delegateTo || !delegationAmount) return

    try {
      const content = `Reputation Delegation\nDelegate To: ${delegateTo}\nAmount: ${delegationAmount} reputation points${delegationReason ? `\nReason: ${delegationReason}` : ''}`
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
    <AppCard title="🎫 Reputation Delegation" subtitle="Delegate reputation to other builders" accent="purple">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Delegation Amount</label>
          <input
            type="text"
            value={delegationAmount}
            onChange={(e) => setDelegationAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason (optional)</label>
          <input
            type="text"
            value={delegationReason}
            onChange={(e) => setDelegationReason(e.target.value)}
            placeholder="Why are you delegating?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleDelegate}
          disabled={isPending || isConfirming || !isConnected || !delegateTo || !delegationAmount}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Delegating...' : 'Delegate Reputation'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Reputation delegation recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

