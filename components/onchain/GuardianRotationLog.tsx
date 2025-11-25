'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function GuardianRotationLog() {
  const { address, isConnected } = useAccount()
  const [guardian, setGuardian] = useState('0xguardian')
  const [reason, setReason] = useState('scheduled rotation')
  const [nextReview, setNextReview] = useState('2025-03-01')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('guardianRotationLog')) {
    return null
  }

  const handleRecord = async () => {
    if (!isConnected || !address) return
    try {
      const content = `Guardian Rotation
Guardian: ${guardian}
Reason: ${reason}
Next Review: ${nextReview}`

      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Guardian rotation log failed:', error)
    }
  }

  return (
    <AppCard title="🧭 Guardian Rotation Log" subtitle="Track guardian council refresh cycles." accent="violet">
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Guardian</label>
          <input
            type="text"
            value={guardian}
            onChange={(e) => setGuardian(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Next Review</label>
          <input
            type="date"
            value={nextReview}
            onChange={(e) => setNextReview(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleRecord}
          disabled={isPending || isConfirming || !isConnected}
          className="w-full rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Rotation'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            ✅ Guardian rotation logged
          </div>
        )}
      </div>
    </AppCard>
  )
}

