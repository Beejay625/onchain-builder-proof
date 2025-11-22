'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ReputationDelegationWithLocks() {
  const { address, isConnected } = useAccount()
  const [delegateAddress, setDelegateAddress] = useState('')
  const [lockDuration, setLockDuration] = useState(30)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainReputationDelegation')) {
    return null
  }

  const handleDelegation = async () => {
    if (!isConnected || !address || !delegateAddress) return

    try {
      const unlockTimestamp = Math.floor(Date.now() / 1000) + lockDuration * 24 * 60 * 60
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [`Delegating reputation to ${delegateAddress} until ${new Date(unlockTimestamp * 1000).toISOString()}`],
      })
    } catch (error) {
      console.error('Delegation failed:', error)
    }
  }

  return (
    <AppCard title="🎫 Reputation Delegation" subtitle="Delegate reputation with time-locked expiration" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delegate Address</label>
          <input
            type="text"
            value={delegateAddress}
            onChange={(e) => setDelegateAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lock Duration (days)</label>
          <input
            type="number"
            value={lockDuration}
            onChange={(e) => setLockDuration(Number(e.target.value))}
            min={1}
            max={365}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleDelegation}
          disabled={isPending || isConfirming || !isConnected || !delegateAddress}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
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


