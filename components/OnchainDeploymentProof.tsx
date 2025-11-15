'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainDeploymentProofProps {
  achievementId: bigint
}

export default function OnchainDeploymentProof({ achievementId }: OnchainDeploymentProofProps) {
  const { address } = useAccount()
  const [deploymentUrl, setDeploymentUrl] = useState('')
  const [deploymentHash, setDeploymentHash] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const recordDeployment = async () => {
    if (!address || !deploymentUrl.trim()) return
    
    const deploymentData = `DEPLOYMENT_PROOF: ${deploymentUrl}${deploymentHash ? ` - Hash: ${deploymentHash}` : ''}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, deploymentData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🚀 Onchain Deployment Proof</h3>
      
      <input
        type="url"
        value={deploymentUrl}
        onChange={(e) => setDeploymentUrl(e.target.value)}
        placeholder="Deployment URL (e.g., https://app.example.com)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={deploymentHash}
        onChange={(e) => setDeploymentHash(e.target.value)}
        placeholder="Deployment hash (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={recordDeployment}
        disabled={isPending || isConfirming || !deploymentUrl.trim()}
        className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Recording...' : 'Record Deployment Proof'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Deployment proof recorded onchain
        </div>
      )}
    </div>
  )
}
