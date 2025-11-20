'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAchievementRecognitionProps {
  achievementId: bigint
}

export default function OnchainAchievementAchievementRecognition({ achievementId }: OnchainAchievementAchievementRecognitionProps) {
  const { address } = useAccount()
  const [recognitionType, setRecognitionType] = useState('featured')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const recognizeAchievement = async () => {
    if (!address) return
    
    const recognitionData = `ACHIEVEMENT_RECOGNITION: ${recognitionType}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, recognitionData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🏅 Achievement Recognition</h3>
      
      <select
        value={recognitionType}
        onChange={(e) => setRecognitionType(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="featured">Featured</option>
        <option value="top">Top Achievement</option>
        <option value="trending">Trending</option>
        <option value="verified">Verified</option>
      </select>
      
      <button
        onClick={recognizeAchievement}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recognizing...' : 'Recognize Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievement recognized onchain
        </div>
      )}
    </div>
  )
}

