'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface ProofGenerationProps {
  achievementId: bigint
}

export default function ProofGeneration({ achievementId }: ProofGenerationProps) {
  const { address, isConnected } = useAccount()
  const [proofType, setProofType] = useState<'ownership' | 'existence' | 'timestamp'>('ownership')
  const [proofFormat, setProofFormat] = useState<'json' | 'merkle'>('json')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainProofGeneration')) {
    return null
  }

  const handleGenerateProof = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Proof Generation\nAchievement: #${achievementId.toString()}\nType: ${proofType}\nFormat: ${proofFormat}\nGenerated: ${new Date().toISOString()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Proof generation failed:', error)
    }
  }

  return (
    <AppCard title="🔐 Proof Generation" subtitle="Generate verifiable achievement proofs" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Type</label>
          <select
            value={proofType}
            onChange={(e) => setProofType(e.target.value as 'ownership' | 'existence' | 'timestamp')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="ownership">Ownership</option>
            <option value="existence">Existence</option>
            <option value="timestamp">Timestamp</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Format</label>
          <select
            value={proofFormat}
            onChange={(e) => setProofFormat(e.target.value as 'json' | 'merkle')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="json">JSON</option>
            <option value="merkle">Merkle Proof</option>
          </select>
        </div>
        <button
          onClick={handleGenerateProof}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Generating...' : 'Generate Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Proof generated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

