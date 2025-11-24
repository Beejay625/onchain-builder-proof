'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementRetroFundingSignalProps {
  achievementId: bigint
}

export default function OnchainAchievementRetroFundingSignal({ achievementId }: OnchainAchievementRetroFundingSignalProps) {
  const { address, isConnected } = useAccount()
  const [retroRound, setRetroRound] = useState('')
  const [retroAsk, setRetroAsk] = useState('')
  const [retroEvidence, setRetroEvidence] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !retroRound.trim() || !retroAsk.trim()) return

    try {
      const payload = `RETRO_SIGNAL:round:${retroRound}:ask:${retroAsk}:evidence:${retroEvidence || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('💸 Retro Funding Signal submission failed:', error)
    }
  }

  return (
    <AppCard title="💸 Retro Funding Signal" subtitle="Share readiness for retro programs" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Program / Round *</label>
          <input
            type="text"
            value={retroRound}
            onChange={(e) => setRetroRound(e.target.value)}
            placeholder="Optimism RP5"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Requested Amount *</label>
          <input
            type="text"
            value={retroAsk}
            onChange={(e) => setRetroAsk(e.target.value)}
            placeholder="5,000 OP"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Link (optional)</label>
          <input
            type="text"
            value={retroEvidence}
            onChange={(e) => setRetroEvidence(e.target.value)}
            placeholder="Dune dashboard"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !retroRound.trim() || !retroAsk.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing Retro Signal' : 'Publish Retro Signal'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Retro signal posted
          </div>
        )}
      </div>
    </AppCard>
  )
}
