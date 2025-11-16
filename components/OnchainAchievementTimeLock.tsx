'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementTimeLock() {
  const { address } = useAccount()
  const [lockDuration, setLockDuration] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createTimeLock = async () => {
    if (!address || !lockDuration) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`TIMELOCK: ${lockDuration} seconds`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⏳ Achievement Time Lock</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Lock duration (seconds)"
          value={lockDuration}
          onChange={(e) => setLockDuration(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createTimeLock}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Locking...' : 'Create Time Lock'}
        </button>
        {isSuccess && <p className="text-green-600">Time lock created onchain!</p>}
      </div>
    </div>
  )
}
