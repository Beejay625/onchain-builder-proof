'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementDeploymentProof() {
  const { address } = useAccount()
  const [txHash, setTxHash] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const proveDeployment = async () => {
    if (!address || !txHash) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`DEPLOY_PROOF: ${txHash}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🚀 Deployment Proof</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Transaction hash"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={proveDeployment}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Proving...' : 'Prove Deployment'}
        </button>
        {isSuccess && <p className="text-green-600">Deployment proven onchain!</p>}
      </div>
    </div>
  )
}

