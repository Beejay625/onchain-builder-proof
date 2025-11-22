'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementZKProofVerificationProps {
  achievementId: bigint
}

export default function OnchainAchievementZKProofVerification({ achievementId }: OnchainAchievementZKProofVerificationProps) {
  const { address } = useAccount()
  const [circuit, setCircuit] = useState('plonk')
  const [proofHash, setProofHash] = useState('0xzkproof')
  const [publicInputs, setPublicInputs] = useState('0xpublic')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordZKProof = () => {
    if (!address || !proofHash.trim()) return

    const payload = `ZK_PROOF|circuit:${circuit}|proof:${proofHash}|inputs:${publicInputs}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-indigo-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🔐 ZK Proof Verification</h3>
      <p className="text-sm text-gray-600 mb-4">Record zero-knowledge proof verifications for privacy-preserving achievements.</p>

      <div className="space-y-3 mb-4">
        <input value={circuit} onChange={(e) => setCircuit(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Circuit type" />
        <input value={proofHash} onChange={(e) => setProofHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proof hash" />
        <input value={publicInputs} onChange={(e) => setPublicInputs(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Public inputs" />
      </div>

      <button
        onClick={recordZKProof}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record ZK proof'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          ✓ ZK proof verification stored.
        </div>
      )}
    </section>
  )
}
