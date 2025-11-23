'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementValidatorOperationsProps {
  achievementId: bigint
}

export default function AchievementValidatorOperations({ achievementId }: AchievementValidatorOperationsProps) {
  const { address, isConnected } = useAccount()
  const [validatorAddress, setValidatorAddress] = useState('')
  const [operationType, setOperationType] = useState<'register' | 'deregister' | 'update'>('register')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementValidatorOperations')) {
    return null
  }

  const handleValidatorOperation = async () => {
    if (!isConnected || !address || !validatorAddress.trim() || !validatorAddress.startsWith('0x')) return

    try {
      const content = `Validator Operations\nAchievement: #${achievementId.toString()}\nValidator: ${validatorAddress}\nOperation: ${operationType}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Validator operation failed:', error)
    }
  }

  return (
    <AppCard title="⚙️ Achievement Validator Operations" subtitle="Track validator operations in blockchain networks" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Operation Type</label>
          <select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value as 'register' | 'deregister' | 'update')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="register">Register</option>
            <option value="deregister">Deregister</option>
            <option value="update">Update</option>
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
          onClick={handleValidatorOperation}
          disabled={isPending || isConfirming || !isConnected || !validatorAddress.trim() || !validatorAddress.startsWith('0x')}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : `${operationType.charAt(0).toUpperCase() + operationType.slice(1)} Validator`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Validator operation recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

