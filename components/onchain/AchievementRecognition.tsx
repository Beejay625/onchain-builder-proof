'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementRecognitionProps {
  achievementId: bigint
}

export default function AchievementRecognition({ achievementId }: AchievementRecognitionProps) {
  const { address, isConnected } = useAccount()
  const [recognitionType, setRecognitionType] = useState<'featured' | 'highlighted' | 'awarded'>('featured')
  const [recognitionMessage, setRecognitionMessage] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementRecognition')) {
    return null
  }

  const handleRecognize = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Achievement Recognition\nAchievement: #${achievementId.toString()}\nType: ${recognitionType}${recognitionMessage ? `\nMessage: ${recognitionMessage}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Recognition failed:', error)
    }
  }

  return (
    <AppCard title="🏅 Achievement Recognition" subtitle="Get recognized for achievements" accent="gold">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recognition Type</label>
          <select
            value={recognitionType}
            onChange={(e) => setRecognitionType(e.target.value as 'featured' | 'highlighted' | 'awarded')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="highlighted">Highlighted</option>
            <option value="awarded">Awarded</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
          <textarea
            value={recognitionMessage}
            onChange={(e) => setRecognitionMessage(e.target.value)}
            placeholder="Recognition message..."
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecognize}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recognizing...' : 'Recognize Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Recognition recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

