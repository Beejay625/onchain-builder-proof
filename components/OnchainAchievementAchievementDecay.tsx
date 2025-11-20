'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementDecay() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [decayRate, setDecayRate] = useState('')
  const [intervalDays, setIntervalDays] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const configureDecay = async () => {
    if (!address || !postId || !decayRate || !intervalDays) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `DECAY:${decayRate}:${intervalDays}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📉 Achievement Decay</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Decay rate (%)"
          value={decayRate}
          onChange={(e) => setDecayRate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Interval days"
          value={intervalDays}
          onChange={(e) => setIntervalDays(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={configureDecay}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Saving...' : 'Configure Decay'}
        </button>
        {isSuccess && <p className="text-green-600">Decay parameters saved!</p>}
      </div>
    </div>
  )
}
