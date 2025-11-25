'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AttestationCircuitStudio() {
  const { address, isConnected } = useAccount()
  const [circuitName, setCircuitName] = useState('builder_attest_v1')
  const [constraints, setConstraints] = useState('proof >= 2 references')
  const [notes, setNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('attestationCircuitStudio')) {
    return null
  }

  const handlePublish = async () => {
    if (!isConnected || !address || !circuitName.trim() || !constraints.trim()) return

    try {
      const content = `Attestation Circuit
Name: ${circuitName}
Constraints: ${constraints}
Notes: ${notes || 'n/a'}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Attestation circuit publish failed:', error)
    }
  }

  return (
    <AppCard
      title="🧩 Attestation Circuit Studio"
      subtitle="Design reusable proof circuits for BuilderProof attestations."
      accent="purple"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Circuit Name</label>
          <input
            type="text"
            value={circuitName}
            onChange={(e) => setCircuitName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Constraint Summary</label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={2}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            rows={2}
          />
        </div>
        <button
          onClick={handlePublish}
          disabled={isPending || isConfirming || !isConnected || !circuitName.trim() || !constraints.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Publishing...' : 'Publish Circuit'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ Circuit recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

