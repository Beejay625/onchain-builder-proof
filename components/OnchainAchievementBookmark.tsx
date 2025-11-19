'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBookmarkProps {
  achievementId: bigint
}

export default function OnchainAchievementBookmark({ achievementId }: OnchainAchievementBookmarkProps) {
  const { address } = useAccount()
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const toggleBookmark = async () => {
    if (!address) return
    
    const bookmarkData = `BOOKMARK: ${isBookmarked ? 'removed' : 'added'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, bookmarkData],
    })
    
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔖 Onchain Bookmark</h3>
      
      <p className="text-gray-600 mb-4">
        {isBookmarked ? 'Achievement is bookmarked' : 'Achievement is not bookmarked'}
      </p>
      
      <button
        onClick={toggleBookmark}
        disabled={isPending || isConfirming}
        className={`w-full px-4 py-2 rounded-lg disabled:bg-gray-400 ${
          isBookmarked 
            ? 'bg-orange-600 hover:bg-orange-700 text-white' 
            : 'bg-gray-600 hover:bg-gray-700 text-white'
        }`}
      >
        {isPending || isConfirming 
          ? 'Processing...' 
          : isBookmarked 
            ? 'Remove Bookmark' 
            : 'Add Bookmark'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Bookmark status updated onchain
        </div>
      )}
    </div>
  )
}

