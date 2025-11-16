'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationBurning() {
  const { address } = useAccount()
  const [burnAmount, setBurnAmount] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const burnReputation = async () => {
    if (!address || !burnAmount) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `BURN: ${burnAmount} reputation burned`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔥 Reputation Burning</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Amount to burn"
          value={burnAmount}
          onChange={(e) => setBurnAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={burnReputation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Burning...' : 'Burn Reputation'}
        </button>
        {isSuccess && <p className="text-green-600">Reputation burned!</p>}
      </div>
    </div>
  )
}

