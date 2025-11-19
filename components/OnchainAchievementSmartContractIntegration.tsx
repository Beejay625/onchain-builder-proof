'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementSmartContractIntegration() {
  const { address } = useAccount()
  const [contractAddress, setContractAddress] = useState('')
  const [functionName, setFunctionName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const integrateContract = async () => {
    if (!address || !contractAddress || !functionName) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`INTEGRATE:${contractAddress}:${functionName}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔗 Smart Contract Integration</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Contract address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Function name"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={integrateContract}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Integrating...' : 'Integrate Contract'}
        </button>
        {isSuccess && <p className="text-green-600">Contract integrated onchain!</p>}
      </div>
    </div>
  )
}

