'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementGasOptimization() {
  const { address } = useAccount()
  const [optimization, setOptimization] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const optimizeGas = async () => {
    if (!address || !optimization) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`GAS_OPT:${optimization}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">⛽ Gas Optimization</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Gas optimization strategy"
          value={optimization}
          onChange={(e) => setOptimization(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={optimizeGas}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Optimizing...' : 'Optimize Gas Usage'}
        </button>
        {isSuccess && <p className="text-green-600">Gas optimization recorded!</p>}
      </div>
    </div>
  )
}

