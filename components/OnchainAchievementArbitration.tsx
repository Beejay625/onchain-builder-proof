'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementArbitration() {
  const { address } = useAccount()
  const [disputeReason, setDisputeReason] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const fileDispute = async () => {
    if (!address || !disputeReason) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`DISPUTE: ${disputeReason}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⚖️ Achievement Arbitration</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Dispute reason"
          value={disputeReason}
          onChange={(e) => setDisputeReason(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={fileDispute}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Filing...' : 'File Dispute'}
        </button>
        {isSuccess && <p className="text-green-600">Dispute filed onchain!</p>}
      </div>
    </div>
  )
}
