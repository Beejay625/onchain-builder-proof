'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainDisputeResolutionProps {
  achievementId: bigint
}

export default function OnchainDisputeResolution({ achievementId }: OnchainDisputeResolutionProps) {
  const { address } = useAccount()
  const [resolution, setResolution] = useState('')
  const [disputeId, setDisputeId] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const resolveDispute = async () => {
    if (!address || !resolution.trim() || !disputeId.trim()) return
    
    const resolutionData = `DISPUTE_RESOLUTION #${disputeId}: ${resolution}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, resolutionData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Onchain Dispute Resolution</h3>
      
      <input
        type="text"
        value={disputeId}
        onChange={(e) => setDisputeId(e.target.value)}
        placeholder="Dispute ID"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={resolution}
        onChange={(e) => setResolution(e.target.value)}
        placeholder="Resolution details..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={4}
      />
      
      <button
        onClick={resolveDispute}
        disabled={isPending || isConfirming || !resolution.trim() || !disputeId.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Resolving...' : 'Resolve Dispute'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Resolution recorded onchain
        </div>
      )}
    </div>
  )
}

