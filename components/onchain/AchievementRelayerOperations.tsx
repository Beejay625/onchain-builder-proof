'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementRelayerOperationsProps {
  achievementId: bigint
}

export default function AchievementRelayerOperations({ achievementId }: AchievementRelayerOperationsProps) {
  const { address, isConnected } = useAccount()
  const [relayerAddress, setRelayerAddress] = useState('')
  const [operationType, setOperationType] = useState<'relay' | 'verify' | 'submit'>('relay')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementRelayerOperations')) {
    return null
  }

  const handleRelayerOperation = async () => {
    if (!isConnected || !address || !relayerAddress.trim() || !relayerAddress.startsWith('0x')) return

    try {
      const content = `Relayer Operations\nAchievement: #${achievementId.toString()}\nRelayer: ${relayerAddress}\nOperation: ${operationType}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Relayer operation failed:', error)
    }
  }

  return (
    <AppCard title="🚚 Achievement Relayer Operations" subtitle="Track relayer operations in cross-chain protocols" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Operation Type</label>
          <select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value as 'relay' | 'verify' | 'submit')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="relay">Relay</option>
            <option value="verify">Verify</option>
            <option value="submit">Submit</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Relayer Address</label>
          <input
            type="text"
            value={relayerAddress}
            onChange={(e) => setRelayerAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleRelayerOperation}
          disabled={isPending || isConfirming || !isConnected || !relayerAddress.trim() || !relayerAddress.startsWith('0x')}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Processing...' : `${operationType.charAt(0).toUpperCase() + operationType.slice(1)} Transaction`}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Relayer operation recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

