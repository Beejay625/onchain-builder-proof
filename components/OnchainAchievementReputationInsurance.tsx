'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationInsurance() {
  const { address } = useAccount()
  const [coverage, setCoverage] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const purchaseInsurance = async () => {
    if (!address || !coverage) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `INSURANCE: ${coverage} coverage`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🛡️ Reputation Insurance</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Coverage amount"
          value={coverage}
          onChange={(e) => setCoverage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={purchaseInsurance}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Purchasing...' : 'Purchase Insurance'}
        </button>
        {isSuccess && <p className="text-green-600">Insurance purchased!</p>}
      </div>
    </div>
  )
}

