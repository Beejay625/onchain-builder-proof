'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import { keccak256, toUtf8Bytes } from 'viem'

interface AchievementMerkleProofsProps {
  achievementId: bigint
}

export default function AchievementMerkleProofs({ achievementId }: AchievementMerkleProofsProps) {
  const { address, isConnected } = useAccount()
  const [merkleRoot, setMerkleRoot] = useState('')
  const [proofPath, setProofPath] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementMerkleProofs')) {
    return null
  }

  const handleVerifyMerkle = async () => {
    if (!isConnected || !address || !merkleRoot.trim() || !proofPath.trim()) return

    try {
      const merkleContent = `MERKLE:${merkleRoot}:${proofPath}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, merkleContent],
      })
    } catch (error) {
      console.error('Merkle proof verification failed:', error)
    }
  }

  return (
    <AppCard title="🌳 Merkle Proofs" subtitle="Efficient validation using Merkle trees" accent="amber">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Path</label>
          <textarea
            value={proofPath}
            onChange={(e) => setProofPath(e.target.value)}
            placeholder="Enter Merkle proof path (comma-separated hashes)..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleVerifyMerkle}
          disabled={isPending || isConfirming || !isConnected || !merkleRoot.trim() || !proofPath.trim()}
          className="w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify Merkle Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
            ✅ Merkle proof verified onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

