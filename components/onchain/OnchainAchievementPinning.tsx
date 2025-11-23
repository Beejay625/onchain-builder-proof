'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementPinningProps {
  achievementId: bigint
}

export default function OnchainAchievementPinning({ achievementId }: OnchainAchievementPinningProps) {
  const { address, isConnected } = useAccount()
  const [pinLocation, setPinLocation] = useState<'profile' | 'dashboard' | 'collection'>('profile')
  const [pinPriority, setPinPriority] = useState(1)
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const pinAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const pinData = `PIN:location:${pinLocation}:priority:${pinPriority}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, pinData],
      })
    } catch (error) {
      console.error('Pinning failed:', error)
    }
  }

  const unpinAchievement = async () => {
    if (!isConnected || !address) return

    try {
      const unpinData = `UNPIN:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, unpinData],
      })
    } catch (error) {
      console.error('Unpinning failed:', error)
    }
  }

  return (
    <AppCard title="📌 Achievement Pinning" subtitle="Pin achievement to profile or dashboard" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pin Location</label>
          <select
            value={pinLocation}
            onChange={(e) => setPinLocation(e.target.value as typeof pinLocation)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="profile">Profile</option>
            <option value="dashboard">Dashboard</option>
            <option value="collection">Collection</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pin Priority</label>
          <input
            type="number"
            min="1"
            max="10"
            value={pinPriority}
            onChange={(e) => setPinPriority(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={pinAchievement}
            disabled={isPending || isConfirming || !isConnected}
            className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            {isPending || isConfirming ? 'Pinning...' : 'Pin'}
          </button>
          <button
            onClick={unpinAchievement}
            disabled={isPending || isConfirming || !isConnected}
            className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
          >
            Unpin
          </button>
        </div>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Pin status updated onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

