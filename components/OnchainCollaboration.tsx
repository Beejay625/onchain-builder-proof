'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainCollaborationProps {
  achievementId: bigint
}

export default function OnchainCollaboration({ achievementId }: OnchainCollaborationProps) {
  const { address } = useAccount()
  const [collaboratorAddress, setCollaboratorAddress] = useState('')
  const [message, setMessage] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const requestCollaboration = async () => {
    if (!address || !collaboratorAddress.trim()) return
    
    const requestText = `COLLAB_REQUEST to ${collaboratorAddress}: ${message || 'Join me on this achievement'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, requestText],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🤝 Onchain Collaboration</h3>
      
      <input
        type="text"
        value={collaboratorAddress}
        onChange={(e) => setCollaboratorAddress(e.target.value)}
        placeholder="Collaborator wallet address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Collaboration message..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={requestCollaboration}
        disabled={isPending || isConfirming || !collaboratorAddress.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Sending...' : 'Request Collaboration'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Collaboration request sent onchain
        </div>
      )}
    </div>
  )
}

