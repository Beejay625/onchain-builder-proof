'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCollectionProps {
  achievementId: bigint
}

export default function OnchainAchievementCollection({ achievementId }: OnchainAchievementCollectionProps) {
  const { address } = useAccount()
  const [collectionName, setCollectionName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addToCollection = async () => {
    if (!address || !collectionName.trim()) return
    
    const collectionData = `COLLECTION: ${collectionName}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, collectionData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📚 Onchain Collection</h3>
      
      <input
        type="text"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        placeholder="Collection name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={addToCollection}
        disabled={isPending || isConfirming || !collectionName.trim()}
        className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Adding...' : 'Add to Collection Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Added to collection onchain
        </div>
      )}
    </div>
  )
}

