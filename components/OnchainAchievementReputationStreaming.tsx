'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationStreaming() {
  const { address } = useAccount()
  const [recipient, setRecipient] = useState('')
  const [rate, setRate] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const startStream = async () => {
    if (!address || !recipient || !rate) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `STREAM: ${rate}/day to ${recipient}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">💧 Reputation Streaming</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Recipient address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Stream rate per day"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={startStream}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Starting...' : 'Start Stream'}
        </button>
        {isSuccess && <p className="text-green-600">Stream started!</p>}
      </div>
    </div>
  )
}

