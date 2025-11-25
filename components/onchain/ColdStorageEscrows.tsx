'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ColdStorageEscrows() {
  const { address, isConnected } = useAccount()
  const [custodian, setCustodian] = useState('')
  const [unlockCondition, setUnlockCondition] = useState('Multi-sig approval + reown session')
  const [assetType, setAssetType] = useState('USDC')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('coldStorageEscrows')) {
    return null
  }

  const handleEscrowLog = async () => {
    if (!isConnected || !address || !custodian.trim()) return

    try {
      const content = `Cold Storage Escrow
Custodian: ${custodian}
Asset: ${assetType}
Unlock Condition: ${unlockCondition}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Cold storage escrow log failed:', error)
    }
  }

  return (
    <AppCard
      title="🧊 Cold Storage Escrows"
      subtitle="Track long-term custody arrangements guarding program treasuries."
      accent="cyan"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Custodian</label>
          <input
            type="text"
            value={custodian}
            onChange={(e) => setCustodian(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Asset</label>
          <input
            type="text"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Unlock Condition</label>
          <textarea
            value={unlockCondition}
            onChange={(e) => setUnlockCondition(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={2}
          />
        </div>
        <button
          onClick={handleEscrowLog}
          disabled={isPending || isConfirming || !isConnected || !custodian.trim()}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Escrow'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ Escrow metadata anchored
          </div>
        )}
      </div>
    </AppCard>
  )
}

