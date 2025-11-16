'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementReputationDelegation() {
  const { address } = useAccount()
  const [delegateTo, setDelegateTo] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const delegateReputation = async () => {
    if (!address || !delegateTo) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`REP_DELEGATE: ${delegateTo}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎫 Reputation Delegation</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Delegate to address"
          value={delegateTo}
          onChange={(e) => setDelegateTo(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={delegateReputation}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Delegating...' : 'Delegate Reputation'}
        </button>
        {isSuccess && <p className="text-green-600">Reputation delegated onchain!</p>}
      </div>
    </div>
  )
}

