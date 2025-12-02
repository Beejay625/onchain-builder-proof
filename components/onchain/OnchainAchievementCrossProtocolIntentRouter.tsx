'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toBytes } from 'viem'

interface OnchainAchievementCrossProtocolIntentRouterProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossProtocolIntentRouter({
  achievementId,
}: OnchainAchievementCrossProtocolIntentRouterProps) {
  const { address, isConnected } = useAccount()
  const [routerId, setRouterId] = useState('')
  const [sourceProtocol, setSourceProtocol] = useState('')
  const [targetProtocol, setTargetProtocol] = useState('')
  const [intentCount, setIntentCount] = useState('')
  const [routerStatus, setRouterStatus] = useState('active')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  if (!isFeatureEnabled('achievementCrossProtocolIntentRouter')) {
    return null
  }

  const handleSubmit = async () => {
    if (!isConnected || !address || !routerId || !sourceProtocol || !targetProtocol || !intentCount) return

    try {
      const proofHash = keccak256(toBytes(`${routerId}-${Date.now()}`))
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'logCrossProtocolIntentRouter',
        args: [
          achievementId,
          routerId,
          sourceProtocol,
          targetProtocol,
          BigInt(intentCount),
          proofHash,
          routerStatus,
        ],
      })
    } catch (error) {
      console.error('Cross-protocol intent router submission failed:', error)
    }
  }

  return (
    <AppCard
      title="Cross-Protocol Intent Router"
      subtitle="Route intents across different protocols"
      accent="indigo"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Router ID *
          </label>
          <input
            type="text"
            value={routerId}
            onChange={(e) => setRouterId(e.target.value)}
            placeholder="router-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Protocol *
          </label>
          <input
            type="text"
            value={sourceProtocol}
            onChange={(e) => setSourceProtocol(e.target.value)}
            placeholder="Uniswap"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Protocol *
          </label>
          <input
            type="text"
            value={targetProtocol}
            onChange={(e) => setTargetProtocol(e.target.value)}
            placeholder="Aave"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intent Count *
          </label>
          <input
            type="number"
            value={intentCount}
            onChange={(e) => setIntentCount(e.target.value)}
            placeholder="20"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            value={routerStatus}
            onChange={(e) => setRouterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          >
            <option value="active">Active</option>
            <option value="routing">Routing</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !address || !routerId || !sourceProtocol || !targetProtocol || !intentCount}
          className="w-full rounded-lg bg-indigo-600 text-white py-3 px-4 font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending
            ? 'Confirming...'
            : isConfirming
              ? 'Processing...'
              : isConfirmed
                ? 'Routed!'
                : 'Route Intents'}
        </button>
        {isConfirmed && (
          <p className="text-sm text-green-600 text-center">Intent routing successful!</p>
        )}
      </div>
    </AppCard>
  )
}

