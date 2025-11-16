'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCollections() {
  const { address } = useAccount()
  const [collectionName, setCollectionName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createCollection = async () => {
    if (!address || !collectionName) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`COLLECTION: ${collectionName}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Achievement Collections</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Collection name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createCollection}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Collection'}
        </button>
        {isSuccess && <p className="text-green-600">Collection created onchain!</p>}
      </div>
    </div>
  )
}
