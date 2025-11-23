'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementSocialGraphProps {
  achievementId: bigint
}

export default function AchievementSocialGraph({ achievementId }: AchievementSocialGraphProps) {
  const { address, isConnected } = useAccount()
  const [connectionType, setConnectionType] = useState('')
  const [connectedAddress, setConnectedAddress] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementSocialGraph')) {
    return null
  }

  const handleAddConnection = async () => {
    if (!isConnected || !address || !connectionType.trim() || !connectedAddress.trim()) return

    try {
      const graphContent = `SOCIALGRAPH:${connectionType}:${connectedAddress}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, graphContent],
      })
    } catch (error) {
      console.error('Social graph connection failed:', error)
    }
  }

  return (
    <AppCard title="🕸️ Social Graph" subtitle="Build and visualize builder network connections" accent="cyan">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Connection Type</label>
          <select
            value={connectionType}
            onChange={(e) => setConnectionType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="">Select type...</option>
            <option value="collaborator">Collaborator</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
            <option value="peer">Peer</option>
            <option value="supporter">Supporter</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Connected Builder Address</label>
          <input
            type="text"
            value={connectedAddress}
            onChange={(e) => setConnectedAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleAddConnection}
          disabled={isPending || isConfirming || !isConnected || !connectionType.trim() || !connectedAddress.trim()}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Adding Connection...' : 'Add Social Connection'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-cyan-50 border border-cyan-200 p-3 text-sm text-cyan-800">
            ✅ Social connection recorded onchain: {connectionType}
          </div>
        )}
      </div>
    </AppCard>
  )
}

