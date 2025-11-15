'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainTimelockProps {
  achievementId: bigint
}

export default function OnchainTimelock({ achievementId }: OnchainTimelockProps) {
  const { address } = useAccount()
  const [lockDuration, setLockDuration] = useState('')
  const [lockReason, setLockReason] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createTimelock = async () => {
    if (!address || !lockDuration) return
    
    const timelockData = `TIMELOCK: ${lockDuration} days - ${lockReason || 'No reason specified'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, timelockData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⏳ Onchain Time-lock</h3>
      
      <input
        type="number"
        value={lockDuration}
        onChange={(e) => setLockDuration(e.target.value)}
        placeholder="Lock duration (days)"
        min="1"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={lockReason}
        onChange={(e) => setLockReason(e.target.value)}
        placeholder="Reason for time-lock..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={createTimelock}
        disabled={isPending || isConfirming || !lockDuration}
        className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : `Create ${lockDuration || '0'}-day Time-lock`}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Time-lock created onchain
        </div>
      )}
    </div>
  )
}

