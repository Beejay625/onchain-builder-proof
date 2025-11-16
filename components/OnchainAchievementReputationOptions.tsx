'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationOptions() {
  const { address } = useAccount()
  const [strikePrice, setStrikePrice] = useState('')
  const [expiry, setExpiry] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createOption = async () => {
    if (!address || !strikePrice || !expiry) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `OPTION: Strike ${strikePrice} expires ${expiry}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Reputation Options</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Strike price"
          value={strikePrice}
          onChange={(e) => setStrikePrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="date"
          placeholder="Expiry date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createOption}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Option'}
        </button>
        {isSuccess && <p className="text-green-600">Option created!</p>}
      </div>
    </div>
  )
}

