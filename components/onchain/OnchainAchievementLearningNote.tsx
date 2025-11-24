'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementLearningNoteProps {
  achievementId: bigint
}

export default function OnchainAchievementLearningNote({ achievementId }: OnchainAchievementLearningNoteProps) {
  const { address, isConnected } = useAccount()
  const [learningTopic, setLearningTopic] = useState('')
  const [learningInsight, setLearningInsight] = useState('')
  const [learningLink, setLearningLink] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !learningTopic.trim() || !learningInsight.trim()) return

    try {
      const payload = `LEARNING_NOTE:topic:${learningTopic}:insight:${learningInsight}:link:${learningLink || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('📘 Learning Note submission failed:', error)
    }
  }

  return (
    <AppCard title="📘 Learning Note" subtitle="Capture insights learned while shipping" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Topic *</label>
          <input
            type="text"
            value={learningTopic}
            onChange={(e) => setLearningTopic(e.target.value)}
            placeholder="zk circuits"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Insight *</label>
          <textarea
            value={learningInsight}
            onChange={(e) => setLearningInsight(e.target.value)}
            placeholder="Key takeaway"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reference Link (optional)</label>
          <input
            type="text"
            value={learningLink}
            onChange={(e) => setLearningLink(e.target.value)}
            placeholder="Notion, blog"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !learningTopic.trim() || !learningInsight.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Saving Learning' : 'Save Learning'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Learning note saved
          </div>
        )}
      </div>
    </AppCard>
  )
}
