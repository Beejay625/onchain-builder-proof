'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLearningPathProps {
  achievementId: bigint
}

export default function OnchainAchievementLearningPath({ achievementId }: OnchainAchievementLearningPathProps) {
  const { address } = useAccount()
  const [courseName, setCourseName] = useState('')
  const [certificateUrl, setCertificateUrl] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const trackLearning = async () => {
    if (!address || !courseName.trim()) return
    
    const learningData = `LEARNING_PATH: ${courseName}${certificateUrl ? ` | certificate: ${certificateUrl}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, learningData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📚 Learning Path</h3>
      
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course or learning path name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="url"
        value={certificateUrl}
        onChange={(e) => setCertificateUrl(e.target.value)}
        placeholder="Certificate URL (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={trackLearning}
        disabled={isPending || isConfirming || !courseName.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Tracking...' : 'Track Learning Path Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Learning path tracked onchain
        </div>
      )}
    </div>
  )
}


