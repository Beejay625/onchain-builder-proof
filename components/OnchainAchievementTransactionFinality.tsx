'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTransactionFinalityProps {
  achievementId: bigint
}

export default function OnchainAchievementTransactionFinality({ achievementId }: OnchainAchievementTransactionFinalityProps) {
  const { address } = useAccount()
  const [txHash, setTxHash] = useState('0xtx')
  const [blockNumber, setBlockNumber] = useState('')
  const [confirmations, setConfirmations] = useState('12')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordFinality = () => {
    if (!address) return
    if (!txHash.trim()) return
    if (!blockNumber.trim() || isNaN(Number(blockNumber))) return
    if (!txHash.startsWith('0x') || txHash.length !== 66) return

    const payload = `TRANSACTION_FINALITY|tx:${txHash}|block:${blockNumber}|confirmations:${confirmations}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-indigo-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">✅ Transaction Finality</h3>
      <p className="text-sm text-gray-600 mb-4">Record transaction finality confirmations and block numbers.</p>

      <div className="space-y-3 mb-4">
        <input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" placeholder="Transaction hash" />
        <input value={blockNumber} onChange={(e) => setBlockNumber(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Block number" />
        <input type="number" value={confirmations} onChange={(e) => setConfirmations(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Confirmations" min="0" />
      </div>

      <button
        onClick={recordFinality}
        disabled={isPending || isConfirming || !address || !txHash.startsWith('0x')}
        className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record transaction finality'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg p-3">
          ✓ Transaction finality recorded onchain.
        </div>
      )}
    </section>
  )
}
