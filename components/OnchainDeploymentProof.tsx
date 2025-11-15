'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainDeploymentProof() {
  const { address } = useAccount()
  const [deploymentUrl, setDeploymentUrl] = useState('')
  const [network, setNetwork] = useState('')
  const [txHash, setTxHash] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const proveDeployment = async () => {
    if (!address || !deploymentUrl || !network) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Deployment Proof: ${deploymentUrl} on ${network} - TX: ${txHash}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🚀 Deployment Proof</h2>
      <div className="space-y-4">
        <input
          type="url"
          placeholder="Deployment URL"
          value={deploymentUrl}
          onChange={(e) => setDeploymentUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Network (Base, Mainnet, etc.)"
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Transaction hash (optional)"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={proveDeployment}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Proving...' : 'Prove Deployment'}
        </button>
        {isSuccess && <p className="text-green-600">Deployment proven onchain!</p>}
      </div>
    </div>
  )
}

