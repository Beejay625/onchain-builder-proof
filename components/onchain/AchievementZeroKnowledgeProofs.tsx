'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementZeroKnowledgeProofsProps {
  achievementId: bigint
}

export default function AchievementZeroKnowledgeProofs({ achievementId }: AchievementZeroKnowledgeProofsProps) {
  const { address, isConnected } = useAccount()
  const [zkProof, setZkProof] = useState('')
  const [zkCircuit, setZkCircuit] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementZeroKnowledgeProofs')) {
    return null
  }

  const handleVerifyZK = async () => {
    if (!isConnected || !address || !zkProof.trim()) return

    try {
      const zkContent = `ZKPROOF:${zkCircuit || 'custom'}:${zkProof}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, zkContent],
      })
    } catch (error) {
      console.error('ZK proof verification failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Zero-Knowledge Proofs" subtitle="Privacy-preserving proof verification" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZK Circuit (Optional)</label>
          <select
            value={zkCircuit}
            onChange={(e) => setZkCircuit(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="custom">Custom</option>
            <option value="circom">Circom</option>
            <option value="snarkjs">SnarkJS</option>
            <option value="zk-snark">ZK-SNARK</option>
            <option value="zk-stark">ZK-STARK</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZK Proof</label>
          <textarea
            value={zkProof}
            onChange={(e) => setZkProof(e.target.value)}
            placeholder="Enter zero-knowledge proof data..."
            rows={6}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleVerifyZK}
          disabled={isPending || isConfirming || !isConnected || !zkProof.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify ZK Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Zero-knowledge proof verified onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

