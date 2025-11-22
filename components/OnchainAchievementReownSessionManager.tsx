'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementReownSessionManagerProps {
  achievementId: bigint
}

export default function OnchainAchievementReownSessionManager({ achievementId }: OnchainAchievementReownSessionManagerProps) {
  const { address } = useAccount()
  const [sessionId, setSessionId] = useState('session-123')
  const [permissions, setPermissions] = useState('sign, send')
  const [expiry, setExpiry] = useState('3600')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordSession = () => {
    if (!address || !sessionId.trim()) return

    const payload = `REOWN_SESSION|id:${sessionId}|perms:${permissions}|expiry:${expiry}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-sky-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔐 Reown Session Manager</h3>
      <p className="text-sm text-gray-600 mb-4">Track Reown wallet session permissions and expiry.</p>

      <div className="space-y-3 mb-4">
        <input value={sessionId} onChange={(e) => setSessionId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-sky-500" placeholder="Session ID" />
        <input value={permissions} onChange={(e) => setPermissions(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Permissions" />
        <input type="number" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Expiry (seconds)" />
      </div>

      <button
        onClick={recordSession}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Reown session'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-sky-700 bg-sky-50 border border-sky-200 rounded-lg p-3">
          ✓ Reown session recorded onchain.
        </div>
      )}
    </section>
  )
}
