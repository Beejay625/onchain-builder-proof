'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function LearningPathTracking() {
  const [courseName, setCourseName] = useState('')
  const [certificateURL, setCertificateURL] = useState('')
  const [progress, setProgress] = useState('100')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const trackProgress = async () => {
    if (!courseName.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'trackLearningPath',
        args: [courseName, certificateURL, BigInt(parseInt(progress))],
      })
    } catch (error) {
      console.error('Learning path tracking error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📚 Learning Path Tracking</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Solidity Fundamentals"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Certificate URL (Optional)</label>
          <input
            type="url"
            value={certificateURL}
            onChange={(e) => setCertificateURL(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Progress (%)</label>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            min="0"
            max="100"
          />
        </div>
        <button
          onClick={trackProgress}
          disabled={isPending}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending ? 'Recording...' : 'Record Progress'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Progress tracked onchain
          </div>
        )}
      </div>
    </div>
  )
}
