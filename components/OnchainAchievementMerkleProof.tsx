'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMerkleProofProps {
  achievementId: bigint
}

export default function OnchainAchievementMerkleProof({ achievementId }: OnchainAchievementMerkleProofProps) {
  const { address } = useAccount()
  const [merkleRoot, setMerkleRoot] = useState('0xroot')
  const [proof, setProof] = useState('0xproof')
  const [leaf, setLeaf] = useState('0xleaf')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordProof = () => {
    if (!address) return
    if (!merkleRoot.trim()) return

    const payload = `MERKLE_PROOF|root:${merkleRoot}|proof:${proof}|leaf:${leaf}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-indigo-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌳 Merkle Proof</h3>
      <p className="text-sm text-gray-600 mb-4">Record Merkle tree proof verifications for efficient data validation.</p>

      <div className="space-y-3 mb-4">
        <input value={merkleRoot} onChange={(e) => setMerkleRoot(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" placeholder="Merkle root" />
        <input value={proof} onChange={(e) => setProof(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Proof" />
        <input value={leaf} onChange={(e) => setLeaf(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Leaf" />
      </div>

      <button
        onClick={recordProof}
        disabled={isPending || isConfirming || !address || !merkleRoot.trim()}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Merkle proof'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          ✓ Merkle proof recorded onchain.
        </div>
      )}
    </section>
  )
}
