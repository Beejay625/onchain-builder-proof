'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementPinProps {
  achievementId: bigint
}

export default function OnchainAchievementPin({ achievementId }: OnchainAchievementPinProps) {
  const { address } = useAccount()
  const [isPinned, setIsPinned] = useState(false)
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const togglePin = async () => {
    if (!address) return
    
    const pinData = `PIN: ${isPinned ? 'unpinned' : 'pinned'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, pinData],
    })
    
    setIsPinned(!isPinned)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📌 Onchain Pin</h3>
      
      <p className="text-gray-600 mb-4">
        {isPinned ? 'Achievement is pinned to profile' : 'Achievement is not pinned'}
      </p>
      
      <button
        onClick={togglePin}
        disabled={isPending || isConfirming}
        className={`w-full px-4 py-2 rounded-lg disabled:bg-gray-400 ${
          isPinned 
            ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
            : 'bg-gray-600 hover:bg-gray-700 text-white'
        }`}
      >
        {isPending || isConfirming 
          ? 'Processing...' 
          : isPinned 
            ? 'Unpin Achievement' 
            : 'Pin Achievement'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Pin status updated onchain
        </div>
      )}
    </div>
  )
}

