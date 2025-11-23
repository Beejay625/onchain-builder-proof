'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementMetadataManagementProps {
  achievementId: bigint
}

export default function AchievementMetadataManagement({ achievementId }: AchievementMetadataManagementProps) {
  const { address, isConnected } = useAccount()
  const [metadataKey, setMetadataKey] = useState('')
  const [metadataValue, setMetadataValue] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementMetadataManagement')) {
    return null
  }

  const handleSetMetadata = async () => {
    if (!isConnected || !address || !metadataKey.trim() || !metadataValue.trim()) return

    try {
      const content = `Metadata Update\nAchievement: #${achievementId.toString()}\nKey: ${metadataKey}\nValue: ${metadataValue}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Metadata update failed:', error)
    }
  }

  return (
    <AppCard title="📝 Achievement Metadata Management" subtitle="Manage custom metadata for achievements" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metadata Key</label>
          <input
            type="text"
            value={metadataKey}
            onChange={(e) => setMetadataKey(e.target.value)}
            placeholder="e.g., category, difficulty"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metadata Value</label>
          <input
            type="text"
            value={metadataValue}
            onChange={(e) => setMetadataValue(e.target.value)}
            placeholder="Value for this key"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetMetadata}
          disabled={isPending || isConfirming || !isConnected || !metadataKey.trim() || !metadataValue.trim()}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Metadata'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Metadata updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

