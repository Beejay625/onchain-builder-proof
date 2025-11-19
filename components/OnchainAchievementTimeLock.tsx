'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTimeLockProps {
  achievementId: bigint
}

export default function OnchainAchievementTimeLock({ achievementId }: OnchainAchievementTimeLockProps) {
  const { address } = useAccount()
  const [unlockDate, setUnlockDate] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const setTimeLock = async () => {
    if (!address || !unlockDate) return
    
    const lockData = `TIMELOCK: ${unlockDate}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, lockData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⏰ Time Lock</h3>
      
      <input
        type="datetime-local"
        value={unlockDate}
        onChange={(e) => setUnlockDate(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={setTimeLock}
        disabled={isPending || isConfirming || !unlockDate}
        className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Setting...' : 'Set Time Lock Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Time lock set onchain
        </div>
      )}
    </div>
  )
}
