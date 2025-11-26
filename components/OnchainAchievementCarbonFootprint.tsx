'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCarbonFootprint() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [carbonOffset, setCarbonOffset] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordCarbonOffset = async () => {
    if (!address || !postId || !carbonOffset) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(postId), `CARBON:${carbonOffset}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌱 Carbon Footprint</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Carbon offset (tons CO2)"
          value={carbonOffset}
          onChange={(e) => setCarbonOffset(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={recordCarbonOffset}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Recording...' : 'Record Carbon Offset'}
        </button>
        {isSuccess && <p className="text-green-600">Carbon offset recorded onchain!</p>}
      </div>
    </div>
  )
}




