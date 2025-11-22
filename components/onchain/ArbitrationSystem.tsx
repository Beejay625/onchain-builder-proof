'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface ArbitrationSystemProps {
  achievementId: bigint
}

export default function ArbitrationSystem({ achievementId }: ArbitrationSystemProps) {
  const { address, isConnected } = useAccount()
  const [disputeDescription, setDisputeDescription] = useState('')
  const [arbitratorAddress, setArbitratorAddress] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainArbitration')) {
    return null
  }

  const handleFileDispute = async () => {
    if (!isConnected || !address || !disputeDescription.trim()) return

    try {
      const content = `Arbitration Dispute Filed\nAchievement: #${achievementId.toString()}\nDescription: ${disputeDescription}${arbitratorAddress ? `\nArbitrator: ${arbitratorAddress}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Dispute filing failed:', error)
    }
  }

  return (
    <AppCard title="⚖️ Arbitration System" subtitle="File disputes for arbitration" accent="emerald">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dispute Description</label>
          <textarea
            value={disputeDescription}
            onChange={(e) => setDisputeDescription(e.target.value)}
            placeholder="Describe the dispute..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Arbitrator Address (optional)</label>
          <input
            type="text"
            value={arbitratorAddress}
            onChange={(e) => setArbitratorAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleFileDispute}
          disabled={isPending || isConfirming || !isConnected || !disputeDescription.trim()}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Filing...' : 'File Dispute'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Dispute filed onchain for arbitration
          </div>
        )}
      </div>
    </AppCard>
  )
}

