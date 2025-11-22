'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function CollaborationProof() {
  const { address, isConnected } = useAccount()
  const [collaboratorAddress, setCollaboratorAddress] = useState('')
  const [collaborationDescription, setCollaborationDescription] = useState('')
  const [projectLink, setProjectLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainCollaborationProof')) {
    return null
  }

  const handleProveCollaboration = async () => {
    if (!isConnected || !address || !collaboratorAddress || !collaborationDescription.trim()) return

    try {
      const content = `Collaboration Proof\nCollaborator: ${collaboratorAddress}\nDescription: ${collaborationDescription}${projectLink ? `\nProject: ${projectLink}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Collaboration proof failed:', error)
    }
  }

  return (
    <AppCard title="🤝 Collaboration Proof" subtitle="Prove collaborations with other builders onchain" accent="fuchsia">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Collaborator Address</label>
          <input
            type="text"
            value={collaboratorAddress}
            onChange={(e) => setCollaboratorAddress(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Collaboration Description</label>
          <textarea
            value={collaborationDescription}
            onChange={(e) => setCollaborationDescription(e.target.value)}
            placeholder="What did you collaborate on?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Link (optional)</label>
          <input
            type="text"
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleProveCollaboration}
          disabled={isPending || isConfirming || !isConnected || !collaboratorAddress || !collaborationDescription.trim()}
          className="w-full rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Proving...' : 'Prove Collaboration'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Collaboration proof recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}


