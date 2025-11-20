'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementDeploymentProofProps {
  achievementId: bigint
}

export default function OnchainAchievementDeploymentProof({ achievementId }: OnchainAchievementDeploymentProofProps) {
  const { address } = useAccount()
  const [deploymentUrl, setDeploymentUrl] = useState('')
  const [txHash, setTxHash] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const proveDeployment = async () => {
    if (!address || !deploymentUrl.trim() || !txHash.trim()) return
    
    const deployData = `DEPLOYMENT_PROOF: ${deploymentUrl} | tx: ${txHash}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, deployData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🚀 Deployment Proof</h3>
      
      <input
        type="url"
        value={deploymentUrl}
        onChange={(e) => setDeploymentUrl(e.target.value)}
        placeholder="Deployment URL"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={txHash}
        onChange={(e) => setTxHash(e.target.value)}
        placeholder="Transaction hash"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={proveDeployment}
        disabled={isPending || isConfirming || !deploymentUrl.trim() || !txHash.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Proving...' : 'Prove Deployment Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Deployment proven onchain
        </div>
      )}
    </div>
  )
}
