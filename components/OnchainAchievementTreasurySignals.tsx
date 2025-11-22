'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTreasurySignalsProps {
  achievementId: bigint
}

export default function OnchainAchievementTreasurySignals({ achievementId }: OnchainAchievementTreasurySignalsProps) {
  const { address } = useAccount()
  const [action, setAction] = useState('rebalance stables')
  const [window, setWindow] = useState('14d')
  const [rationale, setRationale] = useState('increase runway before hackathon season')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const broadcastSignal = () => {
    if (!address || !action.trim()) return

    const payload = `TREASURY_SIGNAL|action:${action}|window:${window}|reason:${rationale}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <div className="bg-white border border-amber-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🏦 Treasury Signals</h3>
      <p className="text-sm text-gray-600 mb-4">Attach treasury intents directly onto achievement threads to coordinate funding.</p>

      <textarea
        value={action}
        onChange={(event) => setAction(event.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-3"
        rows={2}
        placeholder="Treasury action"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <input value={window} onChange={(e) => setWindow(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Execution window" />
        <input value={rationale} onChange={(e) => setRationale(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Rationale" />
      </div>

      <button
        onClick={broadcastSignal}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Broadcasting...' : 'Broadcast treasury signal'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          ✓ Treasury signal archived for coordination bots.
        </div>
      )}
    </div>
  )
}
