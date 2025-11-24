'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementChainlinkIntegrationProps {
  achievementId: bigint
}

export default function AchievementChainlinkIntegration({ achievementId }: AchievementChainlinkIntegrationProps) {
  const { address, isConnected } = useAccount()
  const [feedName, setFeedName] = useState('ETH / USD')
  const [network, setNetwork] = useState('Base')
  const [usage, setUsage] = useState('rewards-calculation')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementChainlinkIntegration')) {
    return null
  }

  const handleRecord = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Chainlink Integration\nAchievement: #${achievementId.toString()}\nFeed: ${feedName}\nNetwork: ${network}\nUsage: ${usage}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Chainlink integration log failed:', error)
    }
  }

  return (
    <AppCard title="🔗 Chainlink Integration" subtitle="Log Chainlink data feeds powering achievements" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Feed Name</label>
          <input
            type="text"
            value={feedName}
            onChange={(e) => setFeedName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
            <input
              type="text"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Usage</label>
            <input
              type="text"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleRecord}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Chainlink Feed'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Chainlink integration recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

