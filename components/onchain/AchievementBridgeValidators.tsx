'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementBridgeValidatorsProps {
  achievementId: bigint
}

export default function AchievementBridgeValidators({ achievementId }: AchievementBridgeValidatorsProps) {
  const { address, isConnected } = useAccount()
  const [validatorAddress, setValidatorAddress] = useState('')
  const [validatorStatus, setValidatorStatus] = useState<'active' | 'inactive' | 'slashed'>('active')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementBridgeValidators')) {
    return null
  }

  const handleTrackValidator = async () => {
    if (!isConnected || !address || !validatorAddress.trim() || !validatorAddress.startsWith('0x')) return

    try {
      const content = `Bridge Validators\nAchievement: #${achievementId.toString()}\nValidator: ${validatorAddress}\nStatus: ${validatorStatus}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Bridge validator tracking failed:', error)
    }
  }

  return (
    <AppCard title="🌉 Achievement Bridge Validators" subtitle="Track bridge validators operations in cross-chain protocols" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Validator Status</label>
          <select
            value={validatorStatus}
            onChange={(e) => setValidatorStatus(e.target.value as 'active' | 'inactive' | 'slashed')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="slashed">Slashed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Validator Address</label>
          <input
            type="text"
            value={validatorAddress}
            onChange={(e) => setValidatorAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleTrackValidator}
          disabled={isPending || isConfirming || !isConnected || !validatorAddress.trim() || !validatorAddress.startsWith('0x')}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Tracking...' : 'Track Bridge Validator'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Bridge validator tracked onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

