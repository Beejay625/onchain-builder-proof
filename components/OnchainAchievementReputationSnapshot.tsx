'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationSnapshot() {
  const { address } = useAccount()
  const [blockNumber, setBlockNumber] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createSnapshot = async () => {
    if (!address || !blockNumber) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `SNAPSHOT: Block ${blockNumber}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📸 Reputation Snapshot</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Block number"
          value={blockNumber}
          onChange={(e) => setBlockNumber(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createSnapshot}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Snapshot'}
        </button>
        {isSuccess && <p className="text-green-600">Snapshot created!</p>}
      </div>
    </div>
  )
}

