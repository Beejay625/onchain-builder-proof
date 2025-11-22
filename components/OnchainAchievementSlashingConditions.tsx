'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSlashingConditionsProps {
  achievementId: bigint
}

export default function OnchainAchievementSlashingConditions({ achievementId }: OnchainAchievementSlashingConditionsProps) {
  const { address } = useAccount()
  const [condition, setCondition] = useState('missed deadline')
  const [slashAmount, setSlashAmount] = useState('10%')
  const [appealWindow, setAppealWindow] = useState('7 days')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishCondition = () => {
    if (!address || !condition.trim()) return

    const payload = `SLASHING_CONDITION|condition:${condition}|amount:${slashAmount}|appeal:${appealWindow}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-red-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⚔️ Slashing Conditions</h3>
      <p className="text-sm text-gray-600 mb-4">Define transparent slashing rules tied to achievement milestones.</p>

      <div className="space-y-3 mb-4">
        <input value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Condition" />
        <input value={slashAmount} onChange={(e) => setSlashAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Slash amount" />
        <input value={appealWindow} onChange={(e) => setAppealWindow(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Appeal window" />
      </div>

      <button
        onClick={publishCondition}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing condition...' : 'Publish slashing condition'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
          ✓ Slashing condition recorded onchain.
        </div>
      )}
    </section>
  )
}
