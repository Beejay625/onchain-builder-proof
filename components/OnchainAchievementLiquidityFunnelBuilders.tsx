'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLiquidityFunnelBuildersProps {
  achievementId: bigint
}

export default function OnchainAchievementLiquidityFunnelBuilders({ achievementId }: OnchainAchievementLiquidityFunnelBuildersProps) {
  const { address } = useAccount()
  const [sourceAsset, setSourceAsset] = useState('USDC')
  const [targetPools, setTargetPools] = useState('Curve stETH -> Balancer 80/20')
  const [schedule, setSchedule] = useState('daily @ 14:00 UTC')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordFunnel = () => {
    if (!address) return
    if (!sourceAsset.trim() || !targetPools.trim() || !schedule.trim()) return

    const payload = `LIQUIDITY_FUNNEL|asset:${sourceAsset}|targets:${targetPools}|schedule:${schedule}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-emerald-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌀 Liquidity Funnel Builders</h3>
      <p className="text-sm text-gray-600 mb-4">Capture planned multi-step liquidity provisioning flows.</p>

      <div className="space-y-3 mb-4">
        <input value={sourceAsset} onChange={(e) => setSourceAsset(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500" placeholder="Source asset" />
        <input value={targetPools} onChange={(e) => setTargetPools(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Target pools" />
        <input value={schedule} onChange={(e) => setSchedule(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Execution schedule" />
      </div>

      <button
        onClick={recordFunnel}
        disabled={isPending || isConfirming || !address || !sourceAsset.trim() || !targetPools.trim() || !schedule.trim()}
        className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record liquidity funnel'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
          ✓ Liquidity funnel blueprint stored onchain.
        </div>
      )}
    </section>
  )
}
