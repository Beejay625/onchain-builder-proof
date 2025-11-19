'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSocialGraph() {
  const { address } = useAccount()
  const [connection, setConnection] = useState('')
  const [relationship, setRelationship] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const addConnection = async () => {
    if (!address || !connection || !relationship) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`SOCIAL_GRAPH:${connection}:${relationship}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🕸️ Social Graph</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Connected address"
          value={connection}
          onChange={(e) => setConnection(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select relationship</option>
          <option value="collaborator">Collaborator</option>
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
          <option value="peer">Peer</option>
        </select>
        <button
          onClick={addConnection}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Adding...' : 'Add Connection'}
        </button>
        {isSuccess && <p className="text-green-600">Social connection added!</p>}
      </div>
    </div>
  )
}

