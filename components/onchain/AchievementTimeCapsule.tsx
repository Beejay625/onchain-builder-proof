'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementTimeCapsuleProps {
  achievementId?: bigint
}

export default function AchievementTimeCapsule({ achievementId }: AchievementTimeCapsuleProps) {
  const { address, isConnected } = useAccount()
  const [revealDate, setRevealDate] = useState('')
  const [encryptedContent, setEncryptedContent] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainAchievementTimeCapsule')) {
    return null
  }

  const handleLock = async () => {
    if (!isConnected || !address || !revealDate || !encryptedContent.trim()) return

    try {
      const revealTimestamp = Math.floor(new Date(revealDate).getTime() / 1000)
      const timeCapsuleContent = `TIMECAPSULE:${revealTimestamp}:${encryptedContent}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [timeCapsuleContent],
      })
    } catch (error) {
      console.error('Time capsule lock failed:', error)
    }
  }

  return (
    <AppCard title="⏳ Time Capsule" subtitle="Lock achievements for future reveal" accent="purple">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reveal Date & Time</label>
          <input
            type="datetime-local"
            value={revealDate}
            onChange={(e) => setRevealDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Encrypted Content</label>
          <textarea
            value={encryptedContent}
            onChange={(e) => setEncryptedContent(e.target.value)}
            placeholder="Enter content to be revealed..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleLock}
          disabled={isPending || isConfirming || !isConnected || !revealDate || !encryptedContent.trim()}
          className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Locking...' : 'Lock Time Capsule'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 text-sm text-purple-800">
            ✅ Time capsule locked onchain until {new Date(revealDate).toLocaleString()}
          </div>
        )}
      </div>
    </AppCard>
  )
}

