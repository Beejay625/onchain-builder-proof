'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementEmergencyPauseLogProps {
  achievementId: bigint
}

export default function OnchainAchievementEmergencyPauseLog({ achievementId }: OnchainAchievementEmergencyPauseLogProps) {
  const { address } = useAccount()
  const [reason, setReason] = useState('oracle drift beyond threshold')
  const [triggeredBy, setTriggeredBy] = useState('guardian multisig')
  const [resumeSignal, setResumeSignal] = useState('pending')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishPause = () => {
    if (!address || !reason.trim()) return

    const payload = `EMERGENCY_PAUSE|reason:${reason}|trigger:${triggeredBy}|resume:${resumeSignal}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-rose-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🛑 Emergency Pause Log</h3>
      <p className="text-sm text-gray-600 mb-4">Attach rapid response data to the affected achievement.</p>

      <div className="space-y-3 mb-4">
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" rows={3} />
        <input value={triggeredBy} onChange={(e) => setTriggeredBy(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Triggered by" />
        <input value={resumeSignal} onChange={(e) => setResumeSignal(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Resume status" />
      </div>

      <button
        onClick={publishPause}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Logging pause...' : 'Log emergency pause'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3">
          ✓ Emergency pause entry recorded for incident response.
        </div>
      )}
    </section>
  )
}
