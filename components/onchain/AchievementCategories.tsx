'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementCategoriesProps {
  achievementId: bigint
}

export default function AchievementCategories({ achievementId }: AchievementCategoriesProps) {
  const { address, isConnected } = useAccount()
  const [category, setCategory] = useState('development')
  const [subcategory, setSubcategory] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('achievementCategories')) {
    return null
  }

  const handleSetCategory = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Category Assignment\nAchievement: #${achievementId.toString()}\nCategory: ${category}${subcategory ? `\nSubcategory: ${subcategory}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Category assignment failed:', error)
    }
  }

  return (
    <AppCard title="🏷️ Achievement Categories" subtitle="Categorize achievements for organization" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="learning">Learning</option>
            <option value="collaboration">Collaboration</option>
            <option value="research">Research</option>
            <option value="community">Community</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory (optional)</label>
          <input
            type="text"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            placeholder="e.g., Frontend, Backend"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSetCategory}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting...' : 'Set Category'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Category assigned onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

