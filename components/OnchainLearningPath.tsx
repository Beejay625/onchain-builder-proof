'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainLearningPathProps {
  achievementId: bigint
}

export default function OnchainLearningPath({ achievementId }: OnchainLearningPathProps) {
  const { address } = useAccount()
  const [courseName, setCourseName] = useState('')
  const [progress, setProgress] = useState('')
  const [certificateUrl, setCertificateUrl] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const trackLearning = async () => {
    if (!address || !courseName.trim()) return
    
    const learningData = `LEARNING_PATH: ${courseName} - Progress: ${progress || '0'}%${certificateUrl ? ` - Certificate: ${certificateUrl}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, learningData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📚 Onchain Learning Path Tracking</h3>
      
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Course or learning path name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          placeholder="Progress %"
          min="0"
          max="100"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="url"
          value={certificateUrl}
          onChange={(e) => setCertificateUrl(e.target.value)}
          placeholder="Certificate URL"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
      </div>
      
      <button
        onClick={trackLearning}
        disabled={isPending || isConfirming || !courseName.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Tracking...' : 'Track Learning Progress'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Learning progress recorded onchain
        </div>
      )}
    </div>
  )
}

