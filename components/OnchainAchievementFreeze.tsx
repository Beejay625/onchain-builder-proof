'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementFreezeProps {
  achievementId: bigint
}

export default function OnchainAchievementFreeze({ achievementId }: OnchainAchievementFreezeProps) {
  const { address } = useAccount()
  const [freezeReason, setFreezeReason] = useState('')
  const [freezeDuration, setFreezeDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const freezeAchievement = async () => {
    if (!address) return
    
    const freezeData = `FREEZE:reason:${freezeReason.trim() || 'no-reason'}:duration:${freezeDuration.trim() || 'indefinite'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, freezeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">❄️ Achievement Freeze</h3>
      
      <input
        type="text"
        value={freezeReason}
        onChange={(e) => setFreezeReason(e.target.value)}
        placeholder="Freeze reason (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={freezeDuration}
        onChange={(e) => setFreezeDuration(e.target.value)}
        placeholder="Freeze duration (e.g., 30 days)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={freezeAchievement}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Freezing...' : 'Freeze Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Achievement frozen onchain
        </div>
      )}
    </div>
  )
}

