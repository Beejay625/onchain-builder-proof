'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementReownSessionVaultProps {
  achievementId: bigint
}

export default function OnchainAchievementReownSessionVault({ achievementId }: OnchainAchievementReownSessionVaultProps) {
  const { address } = useAccount()
  const [sessionScope, setSessionScope] = useState('sign-builder-messages')
  const [sessionDuration, setSessionDuration] = useState('3600')
  const [deviceTag, setDeviceTag] = useState('rig-01')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishSession = () => {
    if (!address || !sessionScope.trim()) return

    const payload = `REOWN_SESSION|scope:${sessionScope}|duration:${sessionDuration}|device:${deviceTag}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <div className="bg-white border border-sky-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔐 Reown Session Vault</h3>
      <p className="text-sm text-gray-600 mb-4">Document short-lived Reown permissions attached to build workstreams.</p>

      <div className="space-y-3 mb-4">
        <input value={sessionScope} onChange={(e) => setSessionScope(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Scope" />
        <input value={sessionDuration} onChange={(e) => setSessionDuration(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Duration (sec)" />
        <input value={deviceTag} onChange={(e) => setDeviceTag(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Device tag" />
      </div>

      <button
        onClick={publishSession}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing...' : 'Publish Reown session'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-sky-700 bg-sky-50 border border-sky-200 rounded-lg p-3">
          ✓ Reown session vault entry stored.
        </div>
      )}
    </div>
  )
}
