'use client'

import { useAccount, useReadContract } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

export default function OnchainAchievementReputationMerklization() {
  const { address, isConnected } = useAccount()
  const [merkleRoot, setMerkleRoot] = useState<string | null>(null)

  const { data: root, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getReputationMerkleRoot',
    query: {
      enabled: isConnected,
    },
  })

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🌳 Merkle Proofs</h3>
        <p className="text-gray-600">Connect wallet to view Merkle root</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🌳 Reputation Merklization</h3>
      <p className="text-gray-600 mb-4">
        Efficient validation using Merkle tree proofs onchain
      </p>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">Loading Merkle root...</div>
        ) : root && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Merkle Root</p>
            <p className="text-xs font-mono text-blue-600 break-all">{root.toString()}</p>
          </div>
        )}
      </div>
    </div>
  )
}
