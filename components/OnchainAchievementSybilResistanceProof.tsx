'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSybilResistanceProofProps {
  achievementId: bigint
}

export default function OnchainAchievementSybilResistanceProof({ achievementId }: OnchainAchievementSybilResistanceProofProps) {
  const { address } = useAccount()
  const [method, setMethod] = useState('Worldcoin')
  const [proofHash, setProofHash] = useState('0xproof')
  const [score, setScore] = useState('0.95')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordProof = () => {
    if (!address || !proofHash.trim()) return

    const payload = `SYBIL_PROOF|method:${method}|hash:${proofHash}|score:${score}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-purple-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🛡️ Sybil Resistance Proof</h3>
      <p className="text-sm text-gray-600 mb-4">Attach human verification proofs to prevent duplicate accounts.</p>

      <div className="space-y-3 mb-4">
        <input value={method} onChange={(e) => setMethod(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Verification method" />
        <input value={proofHash} onChange={(e) => setProofHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proof hash" />
        <input value={score} onChange={(e) => setScore(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Score" />
      </div>

      <button
        onClick={recordProof}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording proof...' : 'Record sybil resistance proof'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-lg p-3">
          ✓ Sybil resistance proof stored onchain.
        </div>
      )}
    </section>
  )
}
