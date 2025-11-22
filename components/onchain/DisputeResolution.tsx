'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

interface DisputeResolutionProps {
  disputeId: string
}

export default function DisputeResolution({ disputeId }: DisputeResolutionProps) {
  const { address, isConnected } = useAccount()
  const [resolution, setResolution] = useState('')
  const [resolutionType, setResolutionType] = useState<'approved' | 'rejected' | 'modified'>('approved')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainDisputeResolution')) {
    return null
  }

  const handleResolve = async () => {
    if (!isConnected || !address || !resolution.trim()) return

    try {
      const content = `Dispute Resolution\nDispute ID: ${disputeId}\nResolution: ${resolutionType}\nDetails: ${resolution}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Resolution failed:', error)
    }
  }

  return (
    <AppCard title="✅ Dispute Resolution" subtitle="Resolve disputes onchain" accent="lime">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Type</label>
          <select
            value={resolutionType}
            onChange={(e) => setResolutionType(e.target.value as 'approved' | 'rejected' | 'modified')}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="modified">Modified</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Details</label>
          <textarea
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="Describe the resolution..."
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleResolve}
          disabled={isPending || isConfirming || !isConnected || !resolution.trim()}
          className="w-full rounded-lg bg-lime-600 px-4 py-2 text-sm font-semibold text-white hover:bg-lime-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Resolving...' : 'Resolve Dispute'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Dispute resolved onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}


