'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementGraphIntegrationProps {
  achievementId: bigint
}

export default function AchievementGraphIntegration({ achievementId }: AchievementGraphIntegrationProps) {
  const { address, isConnected } = useAccount()
  const [subgraphUrl, setSubgraphUrl] = useState('')
  const [entitiesIndexed, setEntitiesIndexed] = useState('achievements,profiles')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementGraphIntegration')) {
    return null
  }

  const handleRecordIntegration = async () => {
    if (!isConnected || !address || !subgraphUrl.trim()) return

    try {
      const content = `The Graph Integration\nAchievement: #${achievementId.toString()}\nSubgraph: ${subgraphUrl}\nEntities: ${entitiesIndexed}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Graph integration log failed:', error)
    }
  }

  return (
    <AppCard title="📊 The Graph Integration" subtitle="Capture subgraph deployments powering analytics" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subgraph URL</label>
          <input
            type="text"
            value={subgraphUrl}
            onChange={(e) => setSubgraphUrl(e.target.value)}
            placeholder="https://api.studio.thegraph.com/query/..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Entities Indexed</label>
          <input
            type="text"
            value={entitiesIndexed}
            onChange={(e) => setEntitiesIndexed(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecordIntegration}
          disabled={isPending || isConfirming || !isConnected || !subgraphUrl.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Graph Integration'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Graph integration recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

