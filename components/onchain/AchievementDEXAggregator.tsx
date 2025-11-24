'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementDEXAggregatorProps {
  achievementId: bigint
}

export default function AchievementDEXAggregator({ achievementId }: AchievementDEXAggregatorProps) {
  const { address, isConnected } = useAccount()
  const [aggregatorName, setAggregatorName] = useState('1inch')
  const [routesTested, setRoutesTested] = useState('ETH->USDC->DAI')
  const [bestRate, setBestRate] = useState('0.998')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementDEXAggregator')) {
    return null
  }

  const handleRecord = async () => {
    if (!isConnected || !address || !routesTested.trim()) return

    try {
      const content = `DEX Aggregator\nAchievement: #${achievementId.toString()}\nAggregator: ${aggregatorName}\nRoutes: ${routesTested}\nBest Rate: ${bestRate}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('DEX aggregator log failed:', error)
    }
  }

  return (
    <AppCard title="🧮 DEX Aggregator" subtitle="Benchmark best routes across aggregators" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Aggregator</label>
          <input
            type="text"
            value={aggregatorName}
            onChange={(e) => setAggregatorName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Routes Tested</label>
          <textarea
            value={routesTested}
            onChange={(e) => setRoutesTested(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Best Rate</label>
          <input
            type="text"
            value={bestRate}
            onChange={(e) => setBestRate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecord}
          disabled={isPending || isConfirming || !isConnected || !routesTested.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Aggregator Route'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Aggregator data recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

