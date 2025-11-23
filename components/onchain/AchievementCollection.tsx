'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCollectionProps {
  achievementIds: bigint[]
}

export default function AchievementCollection({ achievementIds }: AchievementCollectionProps) {
  const { address, isConnected } = useAccount()
  const [collectionName, setCollectionName] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainCollection')) {
    return null
  }

  const handleCreateCollection = async () => {
    if (!isConnected || !address || !collectionName.trim() || achievementIds.length === 0) return

    try {
      const content = `Achievement Collection\nName: ${collectionName}\nAchievements: ${achievementIds.map((id) => `#${id.toString()}`).join(', ')}${collectionDescription ? `\nDescription: ${collectionDescription}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Collection creation failed:', error)
    }
  }

  return (
    <AppCard title="📚 Achievement Collection" subtitle="Organize achievements into collections" accent="purple">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Creating collection with {achievementIds.length} achievement{achievementIds.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Collection Name</label>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder="My Collection"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <textarea
            value={collectionDescription}
            onChange={(e) => setCollectionDescription(e.target.value)}
            placeholder="What is this collection about?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleCreateCollection}
          disabled={isPending || isConfirming || !isConnected || !collectionName.trim() || achievementIds.length === 0}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Collection'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Collection created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

