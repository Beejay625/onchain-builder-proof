'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDynamicYieldCurvesProps {
  achievementId: bigint
}

export default function OnchainAchievementDynamicYieldCurves({ achievementId }: OnchainAchievementDynamicYieldCurvesProps) {
  const { address } = useAccount()
  const [strategyName, setStrategyName] = useState('AdaptiveVaultV2')
  const [baseRate, setBaseRate] = useState('12')
  const [boostCondition, setBoostCondition] = useState('utilization > 70%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordYieldCurve = () => {
    if (!address) return
    if (!strategyName.trim() || !baseRate.trim() || !boostCondition.trim()) return

    const payload = `DYNAMIC_YIELD_CURVES|strategy:${strategyName}|baseAPR:${baseRate}%|boost:${boostCondition}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📈 Dynamic Yield Curves</h3>
      <p className="text-sm text-gray-600 mb-4">Describe how vault APYs adapt to utilization or oracle signals.</p>

      <div className="space-y-3 mb-4">
        <input value={strategyName} onChange={(e) => setStrategyName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-500" placeholder="Strategy name" />
        <input type="number" value={baseRate} onChange={(e) => setBaseRate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Base APR (%)" min="0" />
        <input value={boostCondition} onChange={(e) => setBoostCondition(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Boost condition" />
      </div>

      <button
        onClick={recordYieldCurve}
        disabled={isPending || isConfirming || !address || !strategyName.trim() || !baseRate.trim() || !boostCondition.trim()}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record yield curve'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ Dynamic yield curve logged onchain.
        </div>
      )}
    </section>
  )
}
