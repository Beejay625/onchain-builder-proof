'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTimeLockDelaysProps {
  achievementId: bigint
}

export default function OnchainAchievementTimeLockDelays({ achievementId }: OnchainAchievementTimeLockDelaysProps) {
  const { address } = useAccount()
  const [action, setAction] = useState('upgrade contract')
  const [delay, setDelay] = useState('48 hours')
  const [queueTx, setQueueTx] = useState('0xqueued')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordDelay = () => {
    if (!address || !action.trim()) return

    const payload = `TIMELOCK_DELAY|action:${action}|delay:${delay}|queue:${queueTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-amber-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⏰ Time-Lock Delays</h3>
      <p className="text-sm text-gray-600 mb-4">Document time-lock parameters for security-critical operations.</p>

      <div className="space-y-3 mb-4">
        <input value={action} onChange={(e) => setAction(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Action" />
        <input value={delay} onChange={(e) => setDelay(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Delay" />
        <input value={queueTx} onChange={(e) => setQueueTx(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Queue tx" />
      </div>

      <button
        onClick={recordDelay}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording delay...' : 'Record time-lock delay'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
          ✓ Time-lock delay parameters stored.
        </div>
      )}
    </section>
  )
}
