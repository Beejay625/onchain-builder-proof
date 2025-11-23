'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCrossProtocolBridgesProps {
  achievementId: bigint
}

export default function AchievementCrossProtocolBridges({ achievementId }: AchievementCrossProtocolBridgesProps) {
  const { address, isConnected } = useAccount()
  const [targetProtocol, setTargetProtocol] = useState('')
  const [bridgeTxHash, setBridgeTxHash] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementCrossProtocolBridges')) {
    return null
  }

  const handleBridge = async () => {
    if (!isConnected || !address || !targetProtocol.trim() || !bridgeTxHash.trim()) return

    try {
      const bridgeContent = `BRIDGE:${targetProtocol}:${bridgeTxHash}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, bridgeContent],
      })
    } catch (error) {
      console.error('Cross-protocol bridge failed:', error)
    }
  }

  return (
    <AppCard title="🌉 Cross-Protocol Bridges" subtitle="Bridge achievements to other protocols" accent="rose">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Protocol</label>
          <select
            value={targetProtocol}
            onChange={(e) => setTargetProtocol(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="">Select protocol...</option>
            <option value="Optimism">Optimism</option>
            <option value="Arbitrum">Arbitrum</option>
            <option value="Polygon">Polygon</option>
            <option value="Avalanche">Avalanche</option>
            <option value="Solana">Solana</option>
            <option value="Cosmos">Cosmos</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bridge Transaction Hash</label>
          <input
            type="text"
            value={bridgeTxHash}
            onChange={(e) => setBridgeTxHash(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleBridge}
          disabled={isPending || isConfirming || !isConnected || !targetProtocol.trim() || !bridgeTxHash.trim()}
          className="w-full rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Bridging...' : 'Record Bridge Transaction'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-sm text-rose-800">
            ✅ Achievement bridged onchain to {targetProtocol}
          </div>
        )}
      </div>
    </AppCard>
  )
}

