'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function LearningPathTracking() {
  const { address, isConnected } = useAccount()
  const [courseName, setCourseName] = useState('')
  const [certificateUrl, setCertificateUrl] = useState('')
  const [progress, setProgress] = useState(100)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainLearningPathTracking')) {
    return null
  }

  const handleTrackProgress = async () => {
    if (!isConnected || !address || !courseName.trim()) return

    try {
      const content = `Learning Path Progress\nCourse: ${courseName}\nProgress: ${progress}%${certificateUrl ? `\nCertificate: ${certificateUrl}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Progress tracking failed:', error)
    }
  }

  return (
    <AppCard title="📚 Learning Path Tracking" subtitle="Track learning progress and certificates" accent="emerald">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="e.g., Solidity Fundamentals"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            min={0}
            max={100}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Certificate URL (optional)</label>
          <input
            type="text"
            value={certificateUrl}
            onChange={(e) => setCertificateUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleTrackProgress}
          disabled={isPending || isConfirming || !isConnected || !courseName.trim()}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Tracking...' : 'Track Progress'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Learning progress recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

