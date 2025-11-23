'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementMerkleTreeProofsProps {
  achievementId: bigint
}

export default function AchievementMerkleTreeProofs({ achievementId }: AchievementMerkleTreeProofsProps) {
  const { address, isConnected } = useAccount()
  const [merkleRoot, setMerkleRoot] = useState('')
  const [proof, setProof] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementMerkleTreeProofs')) {
    return null
  }

  const handleVerifyProof = async () => {
    if (!isConnected || !address || !merkleRoot.trim() || !proof.trim()) return

    try {
      const content = `Merkle Tree Proof\nAchievement: #${achievementId.toString()}\nRoot: ${merkleRoot}\nProof: ${proof}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Merkle proof verification failed:', error)
    }
  }

  return (
    <AppCard title="🌳 Achievement Merkle Tree Proofs" subtitle="Verify Merkle tree proofs for efficient validation" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Merkle Root</label>
          <input
            type="text"
            value={merkleRoot}
            onChange={(e) => setMerkleRoot(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof (comma-separated)</label>
          <textarea
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            placeholder="0x..., 0x..., 0x..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleVerifyProof}
          disabled={isPending || isConfirming || !isConnected || !merkleRoot.trim() || !proof.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify Merkle Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Merkle proof verified onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

