'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementIntegrationManagementProps {
  achievementId: bigint
}

export default function AchievementIntegrationManagement({ achievementId }: AchievementIntegrationManagementProps) {
  const { address, isConnected } = useAccount()
  const [integrationType, setIntegrationType] = useState<'github' | 'twitter' | 'discord' | 'slack'>('github')
  const [integrationConfig, setIntegrationConfig] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementIntegrationManagement')) {
    return null
  }

  const handleSetupIntegration = async () => {
    if (!isConnected || !address || !integrationConfig.trim()) return

    try {
      const content = `Integration Management\nAchievement: #${achievementId.toString()}\nType: ${integrationType}\nConfig: ${integrationConfig}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Integration setup failed:', error)
    }
  }

  return (
    <AppCard title="🔌 Achievement Integration Management" subtitle="Manage integrations for achievements" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Integration Type</label>
          <select
            value={integrationType}
            onChange={(e) => setIntegrationType(e.target.value as 'github' | 'twitter' | 'discord' | 'slack')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="github">GitHub</option>
            <option value="twitter">Twitter</option>
            <option value="discord">Discord</option>
            <option value="slack">Slack</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Integration Configuration</label>
          <textarea
            value={integrationConfig}
            onChange={(e) => setIntegrationConfig(e.target.value)}
            placeholder="Enter integration configuration..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetupIntegration}
          disabled={isPending || isConfirming || !isConnected || !integrationConfig.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Integration'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Integration configured onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

