'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCollaboration() {
  const { address } = useAccount()
  const [collaborator, setCollaborator] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const requestCollaboration = async () => {
    if (!address || !collaborator) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`COLLAB: Request from ${collaborator}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🤝 Achievement Collaboration</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Collaborator address"
          value={collaborator}
          onChange={(e) => setCollaborator(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={requestCollaboration}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Requesting...' : 'Request Collaboration'}
        </button>
        {isSuccess && <p className="text-green-600">Collaboration requested onchain!</p>}
      </div>
    </div>
  )
}

