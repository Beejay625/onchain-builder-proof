'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

interface AchievementOracleAggregationProps {
  achievementId: bigint
}

export default function AchievementOracleAggregation({ achievementId }: AchievementOracleAggregationProps) {
  const { address, isConnected } = useAccount()
  const [oracleSources, setOracleSources] = useState<string[]>([])
  const [aggregationMethod, setAggregationMethod] = useState<'median' | 'mean' | 'weighted'>('median')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementOracleAggregation')) {
    return null
  }

  const handleAggregate = async () => {
    if (!isConnected || !address || oracleSources.length === 0) return

    try {
      const content = `Oracle Aggregation\nAchievement: #${achievementId.toString()}\nMethod: ${aggregationMethod}\nSources: ${oracleSources.join(', ')}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Oracle aggregation failed:', error)
    }
  }

  const toggleSource = (source: string) => {
    setOracleSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    )
  }

  const availableSources = ['Chainlink', 'Band Protocol', 'UMA', 'API3', 'Tellor']

  return (
    <AppCard title="📊 Achievement Oracle Aggregation" subtitle="Track oracle aggregation operations in cross-chain protocols" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Aggregation Method</label>
          <select
            value={aggregationMethod}
            onChange={(e) => setAggregationMethod(e.target.value as 'median' | 'mean' | 'weighted')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="median">Median</option>
            <option value="mean">Mean</option>
            <option value="weighted">Weighted</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Oracle Sources</label>
          <div className="space-y-2">
            {availableSources.map((source) => (
              <label key={source} className="flex items-center">
                <input
                  type="checkbox"
                  checked={oracleSources.includes(source)}
                  onChange={() => toggleSource(source)}
                  className="rounded border-gray-300"
                />
                <span className="ml-2 text-sm">{source}</span>
              </label>
            ))}
          </div>
        </div>
        {oracleSources.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <StatBadge label="Sources" value={oracleSources.length.toString()} accent="blue" />
            <StatBadge label="Method" value={aggregationMethod} accent="green" />
          </div>
        )}
        <button
          onClick={handleAggregate}
          disabled={isPending || isConfirming || !isConnected || oracleSources.length === 0}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Aggregating...' : 'Aggregate Oracle Data'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Oracle aggregation recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

