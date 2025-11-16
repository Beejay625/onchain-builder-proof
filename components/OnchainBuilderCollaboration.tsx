'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainBuilderCollaboration() {
  const { address } = useAccount()
  const [collaboratorAddress, setCollaboratorAddress] = useState('')
  const [projectName, setProjectName] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordCollaboration = async () => {
    if (!address || !collaboratorAddress || !projectName) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Collaboration: ${projectName} with ${collaboratorAddress}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🤝 Builder Collaboration</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Collaborator address"
          value={collaboratorAddress}
          onChange={(e) => setCollaboratorAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={recordCollaboration}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Collaboration'}
        </button>
        {isSuccess && <p className="text-green-600">Collaboration recorded onchain!</p>}
      </div>
    </div>
  )
}

