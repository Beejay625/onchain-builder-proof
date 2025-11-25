'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementPerformanceBenchmarkProps {
  achievementId: bigint
}

export default function OnchainAchievementPerformanceBenchmark({ achievementId }: OnchainAchievementPerformanceBenchmarkProps) {
  const { address, isConnected } = useAccount()
  const [benchmarkMetric, setBenchmarkMetric] = useState('')
  const [benchmarkValue, setBenchmarkValue] = useState('')
  const [benchmarkBaseline, setBenchmarkBaseline] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const recordBenchmark = async () => {
    if (!isConnected || !address || !benchmarkMetric.trim() || !benchmarkValue.trim()) return

    try {
      const payload = `PERF_BENCHMARK:metric:${benchmarkMetric}:value:${benchmarkValue}:baseline:${benchmarkBaseline || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Performance benchmark failed:', error)
    }
  }

  return (
    <AppCard title="⚡ Performance Benchmark" subtitle="Record performance metrics and baselines" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metric Name *</label>
          <input
            type="text"
            value={benchmarkMetric}
            onChange={(e) => setBenchmarkMetric(e.target.value)}
            placeholder="Response time, throughput, latency"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Metric Value *</label>
          <input
            type="text"
            value={benchmarkValue}
            onChange={(e) => setBenchmarkValue(e.target.value)}
            placeholder="150ms, 1000 req/s"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Baseline (optional)</label>
          <input
            type="text"
            value={benchmarkBaseline}
            onChange={(e) => setBenchmarkBaseline(e.target.value)}
            placeholder="Previous value for comparison"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={recordBenchmark}
          disabled={isPending || isConfirming || !isConnected || !benchmarkMetric.trim() || !benchmarkValue.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Benchmark'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Performance benchmark recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
