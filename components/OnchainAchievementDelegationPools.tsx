'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementDelegationPools() {
  const { address } = useAccount()
  const [poolName, setPoolName] = useState('')
  const [delegateTo, setDelegateTo] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createPool = async () => {
    if (!address || !poolName || !delegateTo) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`DELEGATION_POOL:${poolName}:${delegateTo}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🏊 Delegation Pools</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Pool name"
          value={poolName}
          onChange={(e) => setPoolName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Delegate to address"
          value={delegateTo}
          onChange={(e) => setDelegateTo(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createPool}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Delegation Pool'}
        </button>
        {isSuccess && <p className="text-green-600">Delegation pool created!</p>}
      </div>
    </div>
  )
}

