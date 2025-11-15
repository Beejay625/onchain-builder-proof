'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainCollaborationProofProps {
  achievementId: bigint
}

export default function OnchainCollaborationProof({ achievementId }: OnchainCollaborationProofProps) {
  const { address } = useAccount()
  const [collaboratorAddress, setCollaboratorAddress] = useState('')
  const [collaborationRole, setCollaborationRole] = useState('contributor')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const proveCollaboration = async () => {
    if (!address || !collaboratorAddress.trim()) return
    
    const collaborationData = `COLLABORATION_PROOF: ${collaboratorAddress} - Role: ${collaborationRole}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, collaborationData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🤝 Onchain Collaboration Proof</h3>
      
      <input
        type="text"
        value={collaboratorAddress}
        onChange={(e) => setCollaboratorAddress(e.target.value)}
        placeholder="Collaborator wallet address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <select
        value={collaborationRole}
        onChange={(e) => setCollaborationRole(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="contributor">Contributor</option>
        <option value="co-author">Co-Author</option>
        <option value="reviewer">Reviewer</option>
        <option value="mentor">Mentor</option>
        <option value="other">Other</option>
      </select>
      
      <button
        onClick={proveCollaboration}
        disabled={isPending || isConfirming || !collaboratorAddress.trim()}
        className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Proving...' : 'Prove Collaboration'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Collaboration proof recorded onchain
        </div>
      )}
    </div>
  )
}
