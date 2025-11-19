'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { CATEGORIES } from '@/lib/constants'

interface OnchainAchievementCategoriesProps {
  achievementId: bigint
}

export default function OnchainAchievementCategories({ achievementId }: OnchainAchievementCategoriesProps) {
  const { address } = useAccount()
  const [selectedCategory, setSelectedCategory] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addCategory = async () => {
    if (!address || !selectedCategory) return
    
    const categoryData = `CATEGORY: ${selectedCategory}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, categoryData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📂 Onchain Categories</h3>
      
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="">Select a category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <button
        onClick={addCategory}
        disabled={isPending || isConfirming || !selectedCategory}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Categorizing...' : 'Set Category Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Category stored permanently onchain
        </div>
      )}
    </div>
  )
}
