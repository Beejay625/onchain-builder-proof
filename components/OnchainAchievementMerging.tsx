'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementMergingProps {
  achievementId: bigint
}

export default function OnchainAchievementMerging({ achievementId }: OnchainAchievementMergingProps) {
  const { address } = useAccount()
  const [mergeTargetId, setMergeTargetId] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const mergeAchievements = async () => {
    if (!address || !mergeTargetId.trim()) return
    
    const mergeData = `MERGE: ${achievementId} -> ${mergeTargetId}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, mergeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔀 Merge Achievements</h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Merge this achievement with another achievement
      </p>
      
      <input
        type="number"
        value={mergeTargetId}
        onChange={(e) => setMergeTargetId(e.target.value)}
        placeholder="Target achievement ID"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={mergeAchievements}
        disabled={isPending || isConfirming || !mergeTargetId.trim()}
        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Merging...' : 'Merge Achievements Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Merge recorded onchain
        </div>
      )}
    </div>
  )
}
