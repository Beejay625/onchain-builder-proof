'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationFractionalization() {
  const { address } = useAccount()
  const [totalAmount, setTotalAmount] = useState('')
  const [shares, setShares] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const fractionalize = async () => {
    if (!address || !totalAmount || !shares) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `FRACTION: ${totalAmount} into ${shares} shares`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔢 Reputation Fractionalization</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Total amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Number of shares"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={fractionalize}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Fractionalizing...' : 'Fractionalize'}
        </button>
        {isSuccess && <p className="text-green-600">Reputation fractionalized!</p>}
      </div>
    </div>
  )
}

