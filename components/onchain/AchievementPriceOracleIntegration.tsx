'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementPriceOracleIntegrationProps {
  achievementId: bigint
}

export default function AchievementPriceOracleIntegration({ achievementId }: AchievementPriceOracleIntegrationProps) {
  const { address, isConnected } = useAccount()
  const [oracleProvider, setOracleProvider] = useState('Redstone')
  const [endpoint, setEndpoint] = useState('ETH/USD')
  const [updateInterval, setUpdateInterval] = useState('30s')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementPriceOracleIntegration')) {
    return null
  }

  const handleRecordIntegration = async () => {
    if (!isConnected || !address || !oracleProvider.trim()) return

    try {
      const content = `Price Oracle Integration\nAchievement: #${achievementId.toString()}\nProvider: ${oracleProvider}\nEndpoint: ${endpoint}\nInterval: ${updateInterval}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Oracle integration log failed:', error)
    }
  }

  return (
    <AppCard title="📡 Price Oracle Integration" subtitle="Record oracle endpoints powering onchain insights" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Oracle Provider</label>
          <input
            type="text"
            value={oracleProvider}
            onChange={(e) => setOracleProvider(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Endpoint</label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Update Interval</label>
            <input
              type="text"
              value={updateInterval}
              onChange={(e) => setUpdateInterval(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleRecordIntegration}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Oracle Integration'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Oracle integration recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

