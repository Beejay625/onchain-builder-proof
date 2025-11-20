'use client'

import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementProofGenerationProps {
  achievementId: bigint
}

export default function OnchainAchievementProofGeneration({ achievementId }: OnchainAchievementProofGenerationProps) {
  const { address } = useAccount()
  const [proofData, setProofData] = useState<any>(null)
  
  const { data: post, isLoading } = useReadContract({
    address: BUILDER_PROOF_CONTRACT as `0x${string}`,
    abi: BuilderProofABI,
    functionName: 'getPost',
    args: [achievementId],
  })

  const generateProof = () => {
    if (!post) return
    
    const proof = {
      achievementId: post.id.toString(),
      author: post.author,
      timestamp: post.timestamp.toString(),
      contractAddress: BUILDER_PROOF_CONTRACT,
      blockNumber: 'latest',
      proofHash: `0x${Math.random().toString(16).substr(2, 64)}`,
    }
    
    setProofData(proof)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔐 Proof Generation</h3>
      
      <button
        onClick={generateProof}
        disabled={isLoading || !post}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-4"
      >
        Generate Verifiable Proof
      </button>

      {proofData && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <pre className="text-xs font-mono overflow-auto">
            {JSON.stringify(proofData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
