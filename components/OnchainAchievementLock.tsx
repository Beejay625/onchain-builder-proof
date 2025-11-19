'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementLockProps {
  achievementId: bigint
}

export default function OnchainAchievementLock({ achievementId }: OnchainAchievementLockProps) {
  const { address } = useAccount()
  const [isLocked, setIsLocked] = useState(false)
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const toggleLock = async () => {
    if (!address) return
    
    const lockData = `LOCK: ${isLocked ? 'unlocked' : 'locked'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, lockData],
    })
    
    setIsLocked(!isLocked)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🔐 Onchain Lock</h3>
      
      <p className="text-gray-600 mb-4">
        {isLocked ? 'Achievement is currently locked' : 'Achievement is currently unlocked'}
      </p>
      
      <button
        onClick={toggleLock}
        disabled={isPending || isConfirming}
        className={`w-full px-4 py-2 rounded-lg disabled:bg-gray-400 ${
          isLocked 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {isPending || isConfirming 
          ? 'Processing...' 
          : isLocked 
            ? 'Unlock Achievement' 
            : 'Lock Achievement'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Lock status updated onchain
        </div>
      )}
    </div>
  )
}

