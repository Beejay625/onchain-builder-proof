'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationLending() {
  const { address } = useAccount()
  const [borrower, setBorrower] = useState('')
  const [amount, setAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const lendReputation = async () => {
    if (!address || !borrower || !amount) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `LEND: ${amount} to ${borrower}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Reputation Lending</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Borrower address"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Reputation amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={lendReputation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Lending...' : 'Lend Reputation'}
        </button>
        {isSuccess && <p className="text-green-600">Reputation lent!</p>}
      </div>
    </div>
  )
}

