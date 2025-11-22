'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementStreamGuardsProps {
  achievementId: bigint
}

export default function OnchainAchievementStreamGuards({ achievementId }: OnchainAchievementStreamGuardsProps) {
  const { address } = useAccount()
  const [streamId, setStreamId] = useState('superfluid:stream-123')
  const [guardType, setGuardType] = useState('velocity')
  const [threshold, setThreshold] = useState('>= 3 commits/week')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const addGuard = () => {
    if (!address || !streamId.trim()) return

    const payload = `STREAM_GUARD|stream:${streamId}|type:${guardType}|threshold:${threshold}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-teal-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌊 Stream Guards</h3>
      <p className="text-sm text-gray-600 mb-4">Publish programmable guardrails for token streams tied to achievements.</p>

      <div className="space-y-3 mb-4">
        <input value={streamId} onChange={(e) => setStreamId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Stream id" />
        <input value={guardType} onChange={(e) => setGuardType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Guard type" />
        <input value={threshold} onChange={(e) => setThreshold(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Threshold" />
      </div>

      <button
        onClick={addGuard}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing guard...' : 'Publish stream guard'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-teal-700 bg-teal-50 border border-teal-200 rounded-lg p-3">
          ✓ Stream guard recorded alongside the achievement.
        </div>
      )}
    </section>
  )
}
