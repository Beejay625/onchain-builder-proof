'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementThawProps {
  achievementId: bigint
}

export default function OnchainAchievementThaw({ achievementId }: OnchainAchievementThawProps) {
  const { address } = useAccount()
  const [thawReason, setThawReason] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const thawAchievement = async () => {
    if (!address) return
    
    const thawData = `THAW:reason:${thawReason.trim() || 'manual'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, thawData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔥 Achievement Thaw</h3>
      
      <input
        type="text"
        value={thawReason}
        onChange={(e) => setThawReason(e.target.value)}
        placeholder="Thaw reason (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={thawAchievement}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Thawing...' : 'Thaw Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievement thawed onchain
        </div>
      )}
    </div>
  )
}




