'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementDelegationSystem() {
  const { address } = useAccount()
  const [delegateTo, setDelegateTo] = useState('')
  const [rights, setRights] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const delegateRights = async () => {
    if (!address || !delegateTo || !rights) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `DELEGATE: ${rights} to ${delegateTo}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">👤 Delegation System</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Delegate to address"
          value={delegateTo}
          onChange={(e) => setDelegateTo(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Rights (voting/management)"
          value={rights}
          onChange={(e) => setRights(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={delegateRights}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Delegating...' : 'Delegate Rights'}
        </button>
        {isSuccess && <p className="text-green-600">Delegation recorded onchain!</p>}
      </div>
    </div>
  )
}

