'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementGuardrailProps {
  achievementId: bigint
}

export default function OnchainAchievementGuardrail({ achievementId }: OnchainAchievementGuardrailProps) {
  const { address, isConnected } = useAccount()
  const [guardrailType, setGuardrailType] = useState<'rate-limit' | 'pause' | 'allowlist' | 'other'>('rate-limit')
  const [threshold, setThreshold] = useState('')
  const [notes, setNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const publishGuardrail = async () => {
    if (!isConnected || !address || !notes.trim()) return

    try {
      const payload = `GUARDRAIL:type:${guardrailType}:threshold:${threshold || 'n/a'}:notes:${notes}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('Guardrail publish failed:', error)
    }
  }

  return (
    <AppCard title="🛡️ Guardrail Config" subtitle="Describe throttles, caps, or safety rails" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Guardrail Type</label>
          <select
            value={guardrailType}
            onChange={(e) => setGuardrailType(e.target.value as typeof guardrailType)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="rate-limit">Rate Limit</option>
            <option value="pause">Pause Switch</option>
            <option value="allowlist">Allowlist</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Threshold / Value (optional)</label>
          <input
            type="text"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="100 tx / hr"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Guardrail Notes *</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Explain how this guardrail protects users"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <button
          onClick={publishGuardrail}
          disabled={isPending || isConfirming || !isConnected || !notes.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Guardrail'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Guardrail recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
