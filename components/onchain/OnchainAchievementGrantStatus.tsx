'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementGrantStatusProps {
  achievementId: bigint
}

export default function OnchainAchievementGrantStatus({ achievementId }: OnchainAchievementGrantStatusProps) {
  const { address, isConnected } = useAccount()
  const [grantProgram, setGrantProgram] = useState('')
  const [grantStatus, setGrantStatus] = useState('')
  const [grantDetails, setGrantDetails] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !grantProgram.trim() || !grantStatus.trim() || !grantDetails.trim()) return

    try {
      const payload = `GRANT_STATUS:program:${grantProgram}:status:${grantStatus}:details:${grantDetails}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🏛️ Grant Status submission failed:', error)
    }
  }

  return (
    <AppCard title="🏛️ Grant Status" subtitle="Track grant or bounty program status" accent="green">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Program *</label>
          <input
            type="text"
            value={grantProgram}
            onChange={(e) => setGrantProgram(e.target.value)}
            placeholder="Base Grants"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
          <input
            type="text"
            value={grantStatus}
            onChange={(e) => setGrantStatus(e.target.value)}
            placeholder="Submitted / Paid"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Details *</label>
          <textarea
            value={grantDetails}
            onChange={(e) => setGrantDetails(e.target.value)}
            placeholder="Next milestones"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !grantProgram.trim() || !grantStatus.trim() || !grantDetails.trim()}
          className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Updating Grant Status' : 'Update Grant Status'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Grant status updated
          </div>
        )}
      </div>
    </AppCard>
  )
}
