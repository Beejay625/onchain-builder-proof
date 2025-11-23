'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementCollectionProps {
  achievementId: bigint
}

export default function OnchainAchievementCollection({ achievementId }: OnchainAchievementCollectionProps) {
  const { address, isConnected } = useAccount()
  const [collectionName, setCollectionName] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const addToCollection = async () => {
    if (!isConnected || !address || !collectionName.trim()) return

    try {
      const collectionData = `COLLECTION:name:${collectionName}:description:${collectionDescription || 'N/A'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, collectionData],
      })
    } catch (error) {
      console.error('Collection addition failed:', error)
    }
  }

  const removeFromCollection = async () => {
    if (!isConnected || !address || !collectionName.trim()) return

    try {
      const removeData = `COLLECTION_REMOVE:name:${collectionName}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, removeData],
      })
    } catch (error) {
      console.error('Collection removal failed:', error)
    }
  }

  return (
    <AppCard title="📚 Achievement Collection" subtitle="Organize achievements into collections" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Collection Name *</label>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="e.g., Q4 2024 Achievements"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Collection Description (optional)</label>
          <textarea
            value={collectionDescription}
            onChange={(e) => setCollectionDescription(e.target.value)}
            placeholder="Describe the collection..."
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={addToCollection}
            disabled={isPending || isConfirming || !isConnected || !collectionName.trim()}
            className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
          >
            {isPending || isConfirming ? 'Adding...' : 'Add to Collection'}
          </button>
          <button
            onClick={removeFromCollection}
            disabled={isPending || isConfirming || !isConnected || !collectionName.trim()}
            className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
          >
            Remove
          </button>
        </div>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Collection updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

