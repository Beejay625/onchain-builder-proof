'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationDerivatives() {
  const { address } = useAccount()
  const [derivativeType, setDerivativeType] = useState('')
  const [notional, setNotional] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createDerivative = async () => {
    if (!address || !derivativeType || !notional) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `DERIVATIVE: ${derivativeType} - ${notional}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">📈 Reputation Derivatives</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Derivative type"
          value={derivativeType}
          onChange={(e) => setDerivativeType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Notional value"
          value={notional}
          onChange={(e) => setNotional(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createDerivative}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Derivative'}
        </button>
        {isSuccess && <p className="text-green-600">Derivative created!</p>}
      </div>
    </div>
  )
}

