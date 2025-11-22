'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBatchOperationsProps {
  achievementId: bigint
}

export default function OnchainAchievementBatchOperations({ achievementId }: OnchainAchievementBatchOperationsProps) {
  const { address } = useAccount()
  const [operationCount, setOperationCount] = useState('5')
  const [gasSaved, setGasSaved] = useState('45%')
  const [batchTx, setBatchTx] = useState('0xbatch')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordBatch = () => {
    if (!address || !batchTx.trim()) return

    const payload = `BATCH_OP|count:${operationCount}|gasSaved:${gasSaved}|tx:${batchTx}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📦 Batch Operations</h3>
      <p className="text-sm text-gray-600 mb-4">Record gas-optimized batch transaction proofs.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input value={operationCount} onChange={(e) => setOperationCount(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Operation count" />
        <input value={gasSaved} onChange={(e) => setGasSaved(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Gas saved" />
        <input value={batchTx} onChange={(e) => setBatchTx(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Batch tx" />
      </div>

      <button
        onClick={recordBatch}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record batch operation'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Batch operation proof stored.
        </div>
      )}
    </section>
  )
}
