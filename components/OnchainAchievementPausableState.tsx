'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPausableStateProps {
  achievementId: bigint
}

export default function OnchainAchievementPausableState({ achievementId }: OnchainAchievementPausableStateProps) {
  const { address } = useAccount()
  const [isPaused, setIsPaused] = useState('false')
  const [pauseReason, setPauseReason] = useState('emergency')
  const [pauseTx, setPauseTx] = useState('0xpause')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordPauseState = () => {
    if (!address || !pauseReason.trim()) return

    const payload = `PAUSABLE_STATE|paused:${isPaused}|reason:${pauseReason}|tx:${pauseTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-orange-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⏸️ Pausable State</h3>
      <p className="text-sm text-gray-600 mb-4">Track contract pause and unpause events for security.</p>

      <div className="space-y-3 mb-4">
        <select value={isPaused} onChange={(e) => setIsPaused(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2">
          <option value="true">Paused</option>
          <option value="false">Unpaused</option>
        </select>
        <input value={pauseReason} onChange={(e) => setPauseReason(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Pause reason" />
        <input value={pauseTx} onChange={(e) => setPauseTx(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Transaction hash" />
      </div>

      <button
        onClick={recordPauseState}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record pause state'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
          ✓ Operation recorded successfully onchain.
        </div>
      )}
    </section>
  )
}
