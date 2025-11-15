'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainArbitrationProps {
  achievementId: bigint
}

export default function OnchainArbitration({ achievementId }: OnchainArbitrationProps) {
  const { address } = useAccount()
  const [disputeDescription, setDisputeDescription] = useState('')
  const [arbitratorAddress, setArbitratorAddress] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const fileDispute = async () => {
    if (!address || !disputeDescription.trim()) return
    
    const disputeData = `ARBITRATION_DISPUTE: ${disputeDescription}${arbitratorAddress ? ` - Arbitrator: ${arbitratorAddress}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, disputeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⚖️ Onchain Arbitration</h3>
      
      <textarea
        value={disputeDescription}
        onChange={(e) => setDisputeDescription(e.target.value)}
        placeholder="Describe the dispute..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={4}
      />
      
      <input
        type="text"
        value={arbitratorAddress}
        onChange={(e) => setArbitratorAddress(e.target.value)}
        placeholder="Arbitrator address (optional, 0x...)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={fileDispute}
        disabled={isPending || isConfirming || !disputeDescription.trim()}
        className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Filing...' : 'File Dispute'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Dispute filed onchain
        </div>
      )}
    </div>
  )
}

