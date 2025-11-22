'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementReownWalletIntegrationProps {
  achievementId: bigint
}

export default function OnchainAchievementReownWalletIntegration({ achievementId }: OnchainAchievementReownWalletIntegrationProps) {
  const { address } = useAccount()
  const [walletType, setWalletType] = useState('Reown AppKit')
  const [sessionId, setSessionId] = useState('session-123')
  const [connected, setConnected] = useState('true')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordIntegration = () => {
    if (!address || !sessionId.trim()) return

    const payload = `REOWN_INTEGRATION|type:${walletType}|session:${sessionId}|connected:${connected}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-sky-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔌 Reown Wallet Integration</h3>
      <p className="text-sm text-gray-600 mb-4">Record Reown wallet connection events for achievement tracking.</p>

      <div className="space-y-3 mb-4">
        <input value={walletType} onChange={(e) => setWalletType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Wallet type" />
        <input value={sessionId} onChange={(e) => setSessionId(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Session ID" />
        <input value={connected} onChange={(e) => setConnected(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Connected" />
      </div>

      <button
        onClick={recordIntegration}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Reown integration'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-sky-700 bg-sky-50 border border-sky-200 rounded-lg p-3">
          ✓ Reown integration event stored.
        </div>
      )}
    </section>
  )
}
