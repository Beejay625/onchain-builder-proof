'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementZKProofs() {
  const { address } = useAccount()
  const [zkProof, setZkProof] = useState('')
  const [publicInputs, setPublicInputs] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitZKProof = async () => {
    if (!address || !zkProof || !publicInputs) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`ZK_PROOF:${zkProof}:${publicInputs}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔐 Zero-Knowledge Proofs</h2>
      <div className="space-y-4">
        <textarea
          placeholder="ZK proof data"
          value={zkProof}
          onChange={(e) => setZkProof(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Public inputs"
          value={publicInputs}
          onChange={(e) => setPublicInputs(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={submitZKProof}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Submitting...' : 'Submit ZK Proof'}
        </button>
        {isSuccess && <p className="text-green-600">ZK proof submitted onchain!</p>}
      </div>
    </div>
  )
}

