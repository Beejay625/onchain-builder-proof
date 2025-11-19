'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementForkingProps {
  achievementId: bigint
}

export default function OnchainAchievementForking({ achievementId }: OnchainAchievementForkingProps) {
  const { address } = useAccount()
  const [forkDescription, setForkDescription] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const forkAchievement = async () => {
    if (!address) return
    
    const forkData = `FORK: ${achievementId}${forkDescription ? ` | ${forkDescription}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [forkData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🍴 Fork Achievement</h3>
      
      <p className="text-sm text-gray-600 mb-4">
        Create a derivative achievement based on this one
      </p>
      
      <textarea
        value={forkDescription}
        onChange={(e) => setForkDescription(e.target.value)}
        placeholder="Describe your fork (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={forkAchievement}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Forking...' : 'Fork Achievement Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Fork created onchain
        </div>
      )}
    </div>
  )
}
