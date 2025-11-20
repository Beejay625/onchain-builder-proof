'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBuilderCollaborationProps {
  achievementId: bigint
}

export default function OnchainAchievementBuilderCollaboration({ achievementId }: OnchainAchievementBuilderCollaborationProps) {
  const { address } = useAccount()
  const [collaboratorAddress, setCollaboratorAddress] = useState('')
  const [role, setRole] = useState('contributor')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addCollaborator = async () => {
    if (!address || !collaboratorAddress.trim()) return
    
    const collabData = `COLLABORATION: ${collaboratorAddress} | role: ${role}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, collabData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🤝 Builder Collaboration</h3>
      
      <input
        type="text"
        value={collaboratorAddress}
        onChange={(e) => setCollaboratorAddress(e.target.value)}
        placeholder="Collaborator wallet address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="contributor">Contributor</option>
        <option value="co-author">Co-Author</option>
        <option value="reviewer">Reviewer</option>
        <option value="mentor">Mentor</option>
      </select>
      
      <button
        onClick={addCollaborator}
        disabled={isPending || isConfirming || !collaboratorAddress.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Adding...' : 'Add Collaborator Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Collaborator added onchain
        </div>
      )}
    </div>
  )
}
