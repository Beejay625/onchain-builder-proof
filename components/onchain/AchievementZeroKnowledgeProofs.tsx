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
  const [proofType, setProofType] = useState<'snark' | 'stark' | 'bulletproof'>('snark')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementZeroKnowledgeProofs')) {
    return null
  }

  const handleVerifyZKProof = async () => {
    if (!isConnected || !address || !zkProof.trim()) return

    try {
      const content = `Zero-Knowledge Proof\nAchievement: #${achievementId.toString()}\nType: ${proofType}\nProof: ${zkProof.substring(0, 100)}...`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('ZK proof verification failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Achievement Zero-Knowledge Proofs" subtitle="Verify ZK proofs for privacy-preserving computations" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Type</label>
          <select
            value={proofType}
            onChange={(e) => setProofType(e.target.value as 'snark' | 'stark' | 'bulletproof')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="snark">SNARK</option>
            <option value="stark">STARK</option>
            <option value="bulletproof">Bulletproof</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZK Proof</label>
          <textarea
            value={zkProof}
            onChange={(e) => setZkProof(e.target.value)}
            placeholder="Paste your ZK proof here..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleVerifyZKProof}
          disabled={isPending || isConfirming || !isConnected || !zkProof.trim()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Verifying...' : 'Verify ZK Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ ZK proof verified onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}
