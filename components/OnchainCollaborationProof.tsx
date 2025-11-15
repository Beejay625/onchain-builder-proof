'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'

export default function OnchainCollaborationProof() {
  const { address } = useAccount()
  const [collaborator, setCollaborator] = useState('')
  const [project, setProject] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const proveCollaboration = async () => {
    if (!address || !collaborator || !project) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Collaboration proof: ${project} with ${truncateAddress(collaborator)}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🤝 Collaboration Proof</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project name"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Collaborator address"
          value={collaborator}
          onChange={(e) => setCollaborator(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={proveCollaboration}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Proving...' : 'Prove Collaboration'}
        </button>
        {isSuccess && <p className="text-green-600">Collaboration proven onchain!</p>}
      </div>
    </div>
  )
}

