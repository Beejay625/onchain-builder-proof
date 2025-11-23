'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementGraphProps {
  achievementId: bigint
}

export default function OnchainAchievementGraph({ achievementId }: OnchainAchievementGraphProps) {
  const { address, isConnected } = useAccount()
  const [graphData, setGraphData] = useState({
    relatedAchievements: '',
    graphType: 'network' as 'network' | 'hierarchy' | 'timeline',
    graphNotes: '',
  })
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const createGraph = async () => {
    if (!isConnected || !address || !graphData.relatedAchievements.trim()) return

    try {
      const graphDataStr = `GRAPH:${graphData.graphType}:nodes:${graphData.relatedAchievements}:notes:${graphData.graphNotes || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, graphDataStr],
      })
    } catch (error) {
      console.error('Graph creation failed:', error)
    }
  }

  return (
    <AppCard title="🕸️ Achievement Graph" subtitle="Create achievement relationship graph" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Graph Type</label>
          <select
            value={graphData.graphType}
            onChange={(e) => setGraphData({ ...graphData, graphType: e.target.value as typeof graphData.graphType })}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="network">Network</option>
            <option value="hierarchy">Hierarchy</option>
            <option value="timeline">Timeline</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Related Achievement IDs *</label>
          <input
            type="text"
            value={graphData.relatedAchievements}
            onChange={(e) => setGraphData({ ...graphData, relatedAchievements: e.target.value })}
            placeholder="Comma-separated IDs: 1,2,3"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Graph Notes (optional)</label>
          <input
            type="text"
            value={graphData.graphNotes}
            onChange={(e) => setGraphData({ ...graphData, graphNotes: e.target.value })}
            placeholder="Additional context..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={createGraph}
          disabled={isPending || isConfirming || !isConnected || !graphData.relatedAchievements.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Graph'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Graph created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

