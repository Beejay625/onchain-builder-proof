'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCollaborationProof() {
  const { address } = useAccount()
  const [collaborator, setCollaborator] = useState('')
  const [project, setProject] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const proveCollaboration = async () => {
    if (!address || !collaborator || !project) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `COLLABPROOF: ${collaborator} on ${project}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🤝 Collaboration Proof</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Collaborator address"
          value={collaborator}
          onChange={(e) => setCollaborator(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Project name"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={proveCollaboration}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Proving...' : 'Prove Collaboration'}
        </button>
        {isSuccess && <p className="text-green-600">Collaboration proven onchain!</p>}
      </div>
    </div>
  )
}
