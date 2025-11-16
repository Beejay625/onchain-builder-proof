'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCrossChainProofs() {
  const { address } = useAccount()
  const [chainName, setChainName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createCrossChainProof = async () => {
    if (!address || !chainName) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`CROSS_CHAIN: ${chainName}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌉 Cross-Chain Proofs</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Chain name"
          value={chainName}
          onChange={(e) => setChainName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createCrossChainProof}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Cross-Chain Proof'}
        </button>
        {isSuccess && <p className="text-green-600">Cross-chain proof created!</p>}
      </div>
    </div>
  )
}

