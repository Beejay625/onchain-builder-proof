'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { truncateAddress } from '@/lib/utils'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

interface CollaborationProofProps {
  achievementId: bigint
}

export default function CollaborationProof({ achievementId }: CollaborationProofProps) {
  const [collaborator, setCollaborator] = useState('')
  const [role, setRole] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const proveCollaboration = async () => {
    if (!collaborator.startsWith('0x')) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'proveCollaboration',
        args: [achievementId, collaborator as `0x${string}`, role],
      })
    } catch (error) {
      console.error('Collaboration proof error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🤝 Collaboration Proof</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Collaborator Address</label>
          <input
            type="text"
            value={collaborator}
            onChange={(e) => setCollaborator(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Developer, Designer, etc."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={proveCollaboration}
          disabled={isPending}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending ? 'Recording...' : 'Record Collaboration'}
        </button>
        {isSuccess && (
          <div className="p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Collaboration recorded onchain
          </div>
        )}
      </div>
    </div>
  )
}
