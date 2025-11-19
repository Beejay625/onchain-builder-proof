'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementKeywordsProps {
  achievementId: bigint
}

export default function OnchainAchievementKeywords({ achievementId }: OnchainAchievementKeywordsProps) {
  const { address } = useAccount()
  const [keywords, setKeywords] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const addKeywords = async () => {
    if (!address || !keywords.trim()) return
    
    const keywordData = `KEYWORDS: ${keywords}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, keywordData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏷️ Onchain Keywords</h3>
      
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Enter keywords separated by commas"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={addKeywords}
        disabled={isPending || isConfirming || !keywords.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Adding...' : 'Add Keywords Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Keywords stored permanently onchain
        </div>
      )}
    </div>
  )
}

