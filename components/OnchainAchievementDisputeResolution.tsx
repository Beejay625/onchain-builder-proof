'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementDisputeResolution() {
  const { address } = useAccount()
  const [disputeId, setDisputeId] = useState('')
  const [resolution, setResolution] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const resolveDispute = async () => {
    if (!address || !disputeId || !resolution) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`RESOLVE: ${disputeId} - ${resolution}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">✅ Dispute Resolution</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Dispute ID"
          value={disputeId}
          onChange={(e) => setDisputeId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Resolution"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={resolveDispute}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Resolving...' : 'Resolve Dispute'}
        </button>
        {isSuccess && <p className="text-green-600">Dispute resolved onchain!</p>}
      </div>
    </div>
  )
}

