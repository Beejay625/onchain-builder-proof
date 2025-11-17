'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationUndelegation() {
  const { address } = useAccount()
  const [delegate, setDelegate] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const undelegate = async () => {
    if (!address || !delegate) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `UNDELEGATE: From ${delegate}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">↩️ Undelegation</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Delegate address"
          value={delegate}
          onChange={(e) => setDelegate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={undelegate}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Undelegating...' : 'Undelegate'}
        </button>
        {isSuccess && <p className="text-green-600">Undelegation complete!</p>}
      </div>
    </div>
  )
}

