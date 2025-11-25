'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface FunctionCallTrackingProps {
  achievementId: bigint
}

export default function FunctionCallTracking({ achievementId }: FunctionCallTrackingProps) {
  const { address, isConnected } = useAccount()
  const [functionSignature, setFunctionSignature] = useState('mintAchievement(address,string)')
  const [status, setStatus] = useState<'success' | 'failed'>('success')
  const [notes, setNotes] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('functionCallTracking')) {
    return null
  }

  const handleTrack = async () => {
    if (!isConnected || !address || !functionSignature.trim()) return

    try {
      const content = `Function Call Tracking
Achievement: #${achievementId.toString()}
Function: ${functionSignature}
Status: ${status}
Notes: ${notes || 'n/a'}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Function call tracking failed:', error)
    }
  }

  return (
    <AppCard title="🧰 Function Call Tracking" subtitle="Log sensitive function invocations for auditability" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Function Signature</label>
          <input
            type="text"
            value={functionSignature}
            onChange={(e) => setFunctionSignature(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'success' | 'failed')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleTrack}
          disabled={isPending || isConfirming || !isConnected || !functionSignature.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Call'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
            ✅ Function call recorded
          </div>
        )}
      </div>
    </AppCard>
  )
}

