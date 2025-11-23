'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementBountyProps {
  achievementId: bigint
}

export default function OnchainAchievementBounty({ achievementId }: OnchainAchievementBountyProps) {
  const { address, isConnected } = useAccount()
  const [bountyAmount, setBountyAmount] = useState('')
  const [bountyDescription, setBountyDescription] = useState('')
  const [bountyDeadline, setBountyDeadline] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const createBounty = async () => {
    if (!isConnected || !address || !bountyDescription.trim()) return

    try {
      const deadlineTimestamp = bountyDeadline ? Math.floor(new Date(bountyDeadline).getTime() / 1000) : 0
      const bountyData = `BOUNTY:amount:${bountyAmount || '0'}:description:${bountyDescription}:deadline:${deadlineTimestamp}:${Date.now()}`
      
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, bountyData],
      })
    } catch (error) {
      console.error('Bounty creation failed:', error)
    }
  }

  return (
    <AppCard title="🎯 Achievement Bounty" subtitle="Create bounty for achievement completion" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bounty Amount (optional)</label>
          <input
            type="text"
            value={bountyAmount}
            onChange={(e) => setBountyAmount(e.target.value)}
            placeholder="e.g., 0.5 ETH"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bounty Description *</label>
          <textarea
            value={bountyDescription}
            onChange={(e) => setBountyDescription(e.target.value)}
            placeholder="What needs to be completed?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (optional)</label>
          <input
            type="datetime-local"
            value={bountyDeadline}
            onChange={(e) => setBountyDeadline(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={createBounty}
          disabled={isPending || isConfirming || !isConnected || !bountyDescription.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Bounty'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Bounty created onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

