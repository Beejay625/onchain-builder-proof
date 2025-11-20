'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCollaborationProofProps {
  achievementId: bigint
}

export default function OnchainAchievementCollaborationProof({ achievementId }: OnchainAchievementCollaborationProofProps) {
  const { address } = useAccount()
  const [collaboratorAddress, setCollaboratorAddress] = useState('')
  const [contribution, setContribution] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const proveCollaboration = async () => {
    if (!address || !collaboratorAddress.trim()) return
    
    const collabData = `COLLABORATION_PROOF: ${collaboratorAddress}${contribution ? ` | ${contribution}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, collabData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🤝 Collaboration Proof</h3>
      
      <input
        type="text"
        value={collaboratorAddress}
        onChange={(e) => setCollaboratorAddress(e.target.value)}
        placeholder="Collaborator wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <textarea
        value={contribution}
        onChange={(e) => setContribution(e.target.value)}
        placeholder="Contribution description (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={proveCollaboration}
        disabled={isPending || isConfirming || !collaboratorAddress.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Proving...' : 'Prove Collaboration Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Collaboration proven onchain
        </div>
      )}
    </div>
  )
}
