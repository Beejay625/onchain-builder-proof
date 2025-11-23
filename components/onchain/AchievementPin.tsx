'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface AchievementPinProps {
  achievementId: bigint
}

export default function AchievementPin({ achievementId }: AchievementPinProps) {
  const { address, isConnected } = useAccount()
  const [pinLocation, setPinLocation] = useState<'profile' | 'dashboard' | 'collection'>('profile')
  const [pinNote, setPinNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainPin')) {
    return null
  }

  const handlePin = async () => {
    if (!isConnected || !address) return

    try {
      const content = `Pin Achievement\nAchievement: #${achievementId.toString()}\nLocation: ${pinLocation}${pinNote ? `\nNote: ${pinNote}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Pin operation failed:', error)
    }
  }

  return (
    <AppCard title="📌 Achievement Pin" subtitle="Pin achievements to profile onchain" accent="pink">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pin Location</label>
          <select
            value={pinLocation}
            onChange={(e) => setPinLocation(e.target.value as 'profile' | 'dashboard' | 'collection')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="profile">Profile</option>
            <option value="dashboard">Dashboard</option>
            <option value="collection">Collection</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Note (optional)</label>
          <input
            type="text"
            value={pinNote}
            onChange={(e) => setPinNote(e.target.value)}
            placeholder="Why is this pinned?"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handlePin}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Pinning...' : 'Pin Achievement'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Achievement pinned onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

