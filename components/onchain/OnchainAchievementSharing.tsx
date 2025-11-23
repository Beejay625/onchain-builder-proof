'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementSharingProps {
  achievementId: bigint
}

export default function OnchainAchievementSharing({ achievementId }: OnchainAchievementSharingProps) {
  const { address, isConnected } = useAccount()
  const [sharePlatform, setSharePlatform] = useState<'twitter' | 'linkedin' | 'custom'>('twitter')
  const [shareMessage, setShareMessage] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const shareAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const shareData = `SHARE:platform:${sharePlatform}:message:${shareMessage || 'Check out this achievement!'}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, shareData],
      })
    } catch (error) {
      console.error('Sharing failed:', error)
    }
  }

  return (
    <AppCard title="🔗 Achievement Sharing" subtitle="Share achievements on social platforms" accent="blue">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Share Platform</label>
          <select
            value={sharePlatform}
            onChange={(e) => setSharePlatform(e.target.value as typeof sharePlatform)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Share Message (optional)</label>
          <textarea
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
            placeholder="Custom message for sharing..."
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={shareAchievement}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Sharing...' : 'Share Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            ✅ Share recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

