'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementGraphProps {
  achievementId: bigint
}

export default function OnchainAchievementGraph({ achievementId }: OnchainAchievementGraphProps) {
  const { address } = useAccount()
  const [relatedId, setRelatedId] = useState('')
  const [relationshipType, setRelationshipType] = useState('depends-on')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addRelationship = async () => {
    if (!address || !relatedId.trim()) return
    
    const graphData = `GRAPH:${relationshipType}:${relatedId.trim()}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, graphData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🕸️ Achievement Graph</h3>
      
      <select
        value={relationshipType}
        onChange={(e) => setRelationshipType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="depends-on">Depends On</option>
        <option value="enables">Enables</option>
        <option value="blocks">Blocks</option>
        <option value="related-to">Related To</option>
        <option value="prerequisite">Prerequisite</option>
      </select>
      
      <input
        type="text"
        value={relatedId}
        onChange={(e) => setRelatedId(e.target.value)}
        placeholder="Related achievement ID"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={addRelationship}
        disabled={isPending || isConfirming || !relatedId.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Adding...' : 'Add Relationship Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Relationship added onchain
        </div>
      )}
    </div>
  )
}

