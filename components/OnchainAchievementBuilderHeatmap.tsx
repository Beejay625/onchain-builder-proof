'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBuilderHeatmapProps {
  achievementId: bigint
}

export default function OnchainAchievementBuilderHeatmap({ achievementId }: OnchainAchievementBuilderHeatmapProps) {
  const { address } = useAccount()
  const [weekdayFocus, setWeekdayFocus] = useState('Tue-Thu')
  const [timezone, setTimezone] = useState('UTC+1')
  const [shippingWindow, setShippingWindow] = useState('19:00-23:00')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishHeatmap = () => {
    if (!address) return

    const payload = `BUILDER_HEATMAP|days:${weekdayFocus}|tz:${timezone}|window:${shippingWindow}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-orange-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔥 Builder Heatmap</h3>
      <p className="text-sm text-gray-600 mb-4">Show when the contributor actually ships and in which timezone.</p>

      <div className="space-y-3 mb-4">
        <input value={weekdayFocus} onChange={(e) => setWeekdayFocus(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Weekday focus" />
        <input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Timezone" />
        <input value={shippingWindow} onChange={(e) => setShippingWindow(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Shipping window" />
      </div>

      <button
        onClick={publishHeatmap}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing heatmap...' : 'Publish builder heatmap'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
          ✓ Builder heatmap captured for crew coordinators.
        </div>
      )}
    </section>
  )
}
