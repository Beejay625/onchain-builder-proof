'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementRiskAlertsProps {
  achievementId: bigint
}

export default function OnchainAchievementRiskAlerts({ achievementId }: OnchainAchievementRiskAlertsProps) {
  const { address } = useAccount()
  const [threat, setThreat] = useState('suspicious fork detected')
  const [severity, setSeverity] = useState('medium')
  const [action, setAction] = useState('pause payouts')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishAlert = () => {
    if (!address || !threat.trim()) return

    const payload = `RISK_ALERT|severity:${severity}|action:${action}|note:${threat}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <article className="bg-white rounded-xl border border-rose-100 shadow-sm p-6">
      <h3 className="text-xl font-bold mb-2">🚨 Risk Alerts</h3>
      <p className="text-sm text-gray-600 mb-4">Attach protocol risk advisories straight to the build artifact for transparency.</p>

      <textarea
        value={threat}
        onChange={(event) => setThreat(event.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-3"
        rows={3}
        placeholder="Describe the threat signal"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <select
          value={severity}
          onChange={(event) => setSeverity(event.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <input
          type="text"
          value={action}
          onChange={(event) => setAction(event.target.value)}
          className="border border-gray-300 rounded-lg p-2"
          placeholder="Mitigation action"
        />
      </div>

      <button
        onClick={publishAlert}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing alert...' : 'Post onchain alert'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-3">
          ✓ Alert recorded for downstream automations.
        </div>
      )}
    </article>
  )
}
