'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCollabContractsProps {
  achievementId: bigint
}

export default function OnchainAchievementCollabContracts({ achievementId }: OnchainAchievementCollabContractsProps) {
  const { address } = useAccount()
  const [collaboratorAddress, setCollaboratorAddress] = useState('')
  const [collabRole, setCollabRole] = useState('contributor')
  const [collabTerms, setCollabTerms] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createCollabContract = async () => {
    if (!address || !collaboratorAddress.trim()) return
    
    const collabData = `COLLAB_CONTRACT:collaborator:${collaboratorAddress.trim()}:role:${collabRole}:terms:${collabTerms.trim() || 'standard'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, collabData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🤝 Collaboration Contracts</h3>
      
      <input
        type="text"
        value={collaboratorAddress}
        onChange={(e) => setCollaboratorAddress(e.target.value)}
        placeholder="Collaborator wallet address (0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <select
        value={collabRole}
        onChange={(e) => setCollabRole(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="contributor">Contributor</option>
        <option value="co-author">Co-Author</option>
        <option value="reviewer">Reviewer</option>
        <option value="mentor">Mentor</option>
        <option value="sponsor">Sponsor</option>
      </select>
      
      <textarea
        value={collabTerms}
        onChange={(e) => setCollabTerms(e.target.value)}
        placeholder="Collaboration terms (optional)"
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={createCollabContract}
        disabled={isPending || isConfirming || !collaboratorAddress.trim()}
        className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Collaboration Contract Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Collaboration contract created onchain
        </div>
      )}
    </div>
  )
}
