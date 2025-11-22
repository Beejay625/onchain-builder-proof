'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMerkleRootProofProps {
  achievementId: bigint
}

export default function OnchainAchievementMerkleRootProof({ achievementId }: OnchainAchievementMerkleRootProofProps) {
  const { address } = useAccount()
  const [rootHash, setRootHash] = useState('0xmerkle')
  const [treeDepth, setTreeDepth] = useState('10')
  const [leafCount, setLeafCount] = useState('1024')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordMerkle = () => {
    if (!address || !rootHash.trim()) return

    const payload = `MERKLE_ROOT|root:${rootHash}|depth:${treeDepth}|leaves:${leafCount}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-green-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🌳 Merkle Root Proof</h3>
      <p className="text-sm text-gray-600 mb-4">Store Merkle tree roots for efficient batch verification.</p>

      <div className="space-y-3 mb-4">
        <input value={rootHash} onChange={(e) => setRootHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Root hash" />
        <input value={treeDepth} onChange={(e) => setTreeDepth(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Tree depth" />
        <input value={leafCount} onChange={(e) => setLeafCount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Leaf count" />
      </div>

      <button
        onClick={recordMerkle}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record merkle root'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Merkle root proof stored onchain.
        </div>
      )}
    </section>
  )
}
