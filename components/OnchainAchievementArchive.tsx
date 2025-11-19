'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementArchiveProps {
  achievementId: bigint
}

export default function OnchainAchievementArchive({ achievementId }: OnchainAchievementArchiveProps) {
  const { address } = useAccount()
  const [isArchived, setIsArchived] = useState(false)
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const toggleArchive = async () => {
    if (!address) return
    
    const archiveData = `ARCHIVE: ${isArchived ? 'restored' : 'archived'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, archiveData],
    })
    
    setIsArchived(!isArchived)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📦 Onchain Archive</h3>
      
      <p className="text-gray-600 mb-4">
        {isArchived ? 'Achievement is archived' : 'Achievement is active'}
      </p>
      
      <button
        onClick={toggleArchive}
        disabled={isPending || isConfirming}
        className={`w-full px-4 py-2 rounded-lg disabled:bg-gray-400 ${
          isArchived 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-600 hover:bg-gray-700 text-white'
        }`}
      >
        {isPending || isConfirming 
          ? 'Processing...' 
          : isArchived 
            ? 'Restore Achievement' 
            : 'Archive Achievement'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Archive status updated onchain
        </div>
      )}
    </div>
  )
}

