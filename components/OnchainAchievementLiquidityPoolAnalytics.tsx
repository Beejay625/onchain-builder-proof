'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLiquidityPoolAnalyticsProps {
  achievementId: bigint
}

export default function OnchainAchievementLiquidityPoolAnalytics({ achievementId }: OnchainAchievementLiquidityPoolAnalyticsProps) {
  const { address } = useAccount()
  const [poolAddress, setPoolAddress] = useState('0xpool')
  const [metric, setMetric] = useState('')
  const [value, setValue] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const record = () => {
    if (!address) return
    if (!poolAddress.trim() || !poolAddress.startsWith('0x')) return
    const payload = `LiquidityPoolAnalytics|pool:${poolAddress}|metric:${metric}|value:${value}`
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">LiquidityPoolAnalytics</h3>
      <p className="text-sm text-gray-600 mb-4">Track LiquidityPoolAnalytics metrics in DeFi protocols.</p>
      <div className="space-y-3 mb-4">
        <input value={poolAddress} onChange={(e) => setPoolAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Pool address" />
        <input value={metric} onChange={(e) => setMetric(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Metric" />
        <input value={value} onChange={(e) => setValue(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Value" />
      </div>
      <button onClick={record} disabled={isPending || isConfirming || !address || !poolAddress.startsWith('0x')} className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 disabled:bg-gray-400">
        {isPending || isConfirming ? 'Recording...' : 'Record LiquidityPoolAnalytics'}
      </button>
      {isSuccess && <div className="mt-4 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg p-3">✓ LiquidityPoolAnalytics recorded onchain.</div>}
    </section>
  )
}
