'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAntiSybilShield() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [threshold, setThreshold] = useState('3')
  const [validators, setValidators] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const activateShield = () => {
    if (!address || !postId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [
        BigInt(postId),
        `ANTISYBIL:${threshold}:${validators.replace(/\s+/g, '')}`,
      ],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🛡️ Anti-Sybil Shield</h2>
      <p className="text-gray-600 mb-4">
        Require multi-sourced validations before achievements become public.
      </p>
      <div className="space-y-4">
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Required validator count"
          type="number"
          min="1"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
        <textarea
          className="w-full border rounded-lg p-2"
          placeholder="Approved validator addresses (comma separated)"
          value={validators}
          onChange={(e) => setValidators(e.target.value)}
        />
        <button
          onClick={activateShield}
          disabled={isPending || isConfirming}
          className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Activating...' : 'Activate Shield'}
        </button>
        {isSuccess && (
          <p className="text-green-600">Anti-sybil safeguards stored onchain.</p>
        )}
      </div>
    </div>
  )
}
