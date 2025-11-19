'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementBatchOperations() {
  const { address } = useAccount()
  const [operations, setOperations] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const executeBatch = async () => {
    if (!address || !operations) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`BATCH:${operations}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📦 Batch Operations</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Batch operations (JSON array)"
          value={operations}
          onChange={(e) => setOperations(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={executeBatch}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Executing...' : 'Execute Batch'}
        </button>
        {isSuccess && <p className="text-green-600">Batch operations executed!</p>}
      </div>
    </div>
  )
}

