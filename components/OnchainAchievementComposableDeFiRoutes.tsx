'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementComposableDeFiRoutesProps {
  achievementId: bigint
}

export default function OnchainAchievementComposableDeFiRoutes({ achievementId }: OnchainAchievementComposableDeFiRoutesProps) {
  const { address } = useAccount()
  const [routeName, setRouteName] = useState('OptimisticYieldRoute')
  const [segments, setSegments] = useState('vault->lending->amm')
  const [targetAPY, setTargetAPY] = useState('18.5%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordRoute = () => {
    if (!address) return
    if (!routeName.trim() || !segments.trim() || !targetAPY.trim()) return

    const payload = `COMPOSABLE_DEFI_ROUTES|route:${routeName}|segments:${segments}|targetAPY:${targetAPY}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-indigo-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🧩 Composable DeFi Routes</h3>
      <p className="text-sm text-gray-600 mb-4">Document orchestrated capital routes spanning multiple DeFi protocols.</p>

      <div className="space-y-3 mb-4">
        <input value={routeName} onChange={(e) => setRouteName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" placeholder="Route name" />
        <input value={segments} onChange={(e) => setSegments(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Segment flow (comma separated)" />
        <input value={targetAPY} onChange={(e) => setTargetAPY(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Target APY" />
      </div>

      <button
        onClick={recordRoute}
        disabled={isPending || isConfirming || !address || !routeName.trim() || !segments.trim() || !targetAPY.trim()}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record DeFi route'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          ✓ Composable DeFi route recorded onchain.
        </div>
      )}
    </section>
  )
}
