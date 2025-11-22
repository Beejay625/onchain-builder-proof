'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementBatchTransferProps {
  achievementId: bigint
}

export default function OnchainAchievementBatchTransfer({ achievementId }: OnchainAchievementBatchTransferProps) {
  const { address } = useAccount()
  const [tokenAddress, setTokenAddress] = useState('0xtoken')
  const [recipientCount, setRecipientCount] = useState('10')
  const [gasSaved, setGasSaved] = useState('60%')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const recordBatchTransfer = () => {
    if (!address) return
    if (!tokenAddress.trim() || !tokenAddress.startsWith('0x')) return

    const payload = `BATCH_TRANSFER|token:${tokenAddress}|recipients:${recipientCount}|gasSaved:${gasSaved}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-blue-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">📦 Batch Transfer</h3>
      <p className="text-sm text-gray-600 mb-4">Record gas-optimized batch token transfers.</p>

      <div className="space-y-3 mb-4">
        <input value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500" placeholder="Token address" />
        <input type="number" value={recipientCount} onChange={(e) => setRecipientCount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Recipient count" min="1" />
        <input value={gasSaved} onChange={(e) => setGasSaved(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Gas saved" />
      </div>

      <button
        onClick={recordBatchTransfer}
        disabled={isPending || isConfirming || !address || !tokenAddress.startsWith('0x')}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record batch transfer'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
          ✓ Batch transfer operation recorded.
        </div>
      )}
    </section>
  )
}
