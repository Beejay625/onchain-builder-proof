'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementExtensionSystemProps {
  achievementId: bigint
}

export default function AchievementExtensionSystem({ achievementId }: AchievementExtensionSystemProps) {
  const { address, isConnected } = useAccount()
  const [extensionName, setExtensionName] = useState('')
  const [extensionType, setExtensionType] = useState<'feature' | 'integration' | 'custom'>('feature')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementExtensionSystem')) {
    return null
  }

  const handleAddExtension = async () => {
    if (!isConnected || !address || !extensionName.trim()) return

    try {
      const content = `Extension System\nAchievement: #${achievementId.toString()}\nExtension: ${extensionName}\nType: ${extensionType}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Extension addition failed:', error)
    }
  }

  return (
    <AppCard title="🔌 Achievement Extension System" subtitle="Add extensions to enhance achievements" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Extension Type</label>
          <select
            value={extensionType}
            onChange={(e) => setExtensionType(e.target.value as 'feature' | 'integration' | 'custom')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="feature">Feature</option>
            <option value="integration">Integration</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Extension Name</label>
          <input
            type="text"
            value={extensionName}
            onChange={(e) => setExtensionName(e.target.value)}
            placeholder="extension-name"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleAddExtension}
          disabled={isPending || isConfirming || !isConnected || !extensionName.trim()}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add Extension'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Extension added onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

