'use client'

import { useState } from 'react'
import { useReadContract } from 'wagmi'

interface BadgeOwnershipProofProps {
  contractAddress: string
  tokenId: string
  ownerAddress: string
}

export default function BadgeOwnershipProof({ contractAddress, tokenId, ownerAddress }: BadgeOwnershipProofProps) {
  const [proof, setProof] = useState<string | null>(null)

  const { data: owner } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: [
      {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'ownerOf',
    args: [BigInt(tokenId)],
  })

  const generateProof = () => {
    if (owner && owner.toLowerCase() === ownerAddress.toLowerCase()) {
      const proofData = {
        contractAddress,
        tokenId,
        owner: ownerAddress,
        verified: true,
        timestamp: Date.now(),
        network: 'base',
      }
      setProof(JSON.stringify(proofData, null, 2))
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔐 Ownership Proof</h3>
      
      <button
        onClick={generateProof}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
      >
        Generate Proof
      </button>

      {proof && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <pre className="text-xs overflow-auto">{proof}</pre>
        </div>
      )}
    </div>
  )
}
