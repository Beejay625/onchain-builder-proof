'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationFutures() {
  const { address } = useAccount()
  const [futurePrice, setFuturePrice] = useState('')
  const [settlementDate, setSettlementDate] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createFuture = async () => {
    if (!address || !futurePrice || !settlementDate) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `FUTURE: ${futurePrice} settles ${settlementDate}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Reputation Futures</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Future price"
          value={futurePrice}
          onChange={(e) => setFuturePrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="date"
          placeholder="Settlement date"
          value={settlementDate}
          onChange={(e) => setSettlementDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createFuture}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Future'}
        </button>
        {isSuccess && <p className="text-green-600">Future created!</p>}
      </div>
    </div>
  )
}

