'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainMergingProps {
  achievementId: bigint
}

export default function OnchainMerging({ achievementId }: OnchainMergingProps) {
  const { address } = useAccount()
  const [targetAchievementId, setTargetAchievementId] = useState('')
  const [mergeReason, setMergeReason] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const mergeAchievements = async () => {
    if (!address || !targetAchievementId.trim()) return
    
    const mergeData = `MERGE: Achievement #${achievementId} with #${targetAchievementId} - ${mergeReason || 'No reason specified'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, mergeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔀 Onchain Merging</h3>
      
      <input
        type="text"
        value={targetAchievementId}
        onChange={(e) => setTargetAchievementId(e.target.value)}
        placeholder="Target achievement ID to merge with"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={mergeReason}
        onChange={(e) => setMergeReason(e.target.value)}
        placeholder="Reason for merging..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={mergeAchievements}
        disabled={isPending || isConfirming || !targetAchievementId.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Merging...' : 'Merge Achievements'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Merge request recorded onchain
        </div>
      )}
    </div>
  )
}

