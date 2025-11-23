'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementPluginSystemProps {
  achievementId: bigint
}

export default function AchievementPluginSystem({ achievementId }: AchievementPluginSystemProps) {
  const { address, isConnected } = useAccount()
  const [pluginName, setPluginName] = useState('')
  const [pluginVersion, setPluginVersion] = useState('1.0.0')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementPluginSystem')) {
    return null
  }

  const handleInstallPlugin = async () => {
    if (!isConnected || !address || !pluginName.trim()) return

    try {
      const content = `Plugin Installation\nAchievement: #${achievementId.toString()}\nPlugin: ${pluginName}\nVersion: ${pluginVersion}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Plugin installation failed:', error)
    }
  }

  return (
    <AppCard title="🧩 Achievement Plugin System" subtitle="Install and manage plugins for achievements" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Plugin Name</label>
          <input
            type="text"
            value={pluginName}
            onChange={(e) => setPluginName(e.target.value)}
            placeholder="plugin-name"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Plugin Version</label>
          <input
            type="text"
            value={pluginVersion}
            onChange={(e) => setPluginVersion(e.target.value)}
            placeholder="1.0.0"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleInstallPlugin}
          disabled={isPending || isConfirming || !isConnected || !pluginName.trim()}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Installing...' : 'Install Plugin'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Plugin installed onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

