'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function DeploymentProof() {
  const { address, isConnected } = useAccount()
  const [deploymentUrl, setDeploymentUrl] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const [network, setNetwork] = useState('base')
  const [deploymentDescription, setDeploymentDescription] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainDeploymentProof')) {
    return null
  }

  const handleProveDeployment = async () => {
    if (!isConnected || !address || !deploymentUrl || !transactionHash) return

    try {
      const content = `Deployment Proof\nURL: ${deploymentUrl}\nNetwork: ${network}\nTx Hash: ${transactionHash}${deploymentDescription ? `\nDescription: ${deploymentDescription}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Deployment proof failed:', error)
    }
  }

  return (
    <AppCard title="🚀 Deployment Proof" subtitle="Prove deployments with transaction hashes" accent="indigo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deployment URL</label>
          <input
            type="text"
            value={deploymentUrl}
            onChange={(e) => setDeploymentUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Hash</label>
          <input
            type="text"
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          >
            <option value="base">Base</option>
            <option value="mainnet">Ethereum Mainnet</option>
            <option value="arbitrum">Arbitrum</option>
            <option value="optimism">Optimism</option>
            <option value="polygon">Polygon</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
          <textarea
            value={deploymentDescription}
            onChange={(e) => setDeploymentDescription(e.target.value)}
            placeholder="What was deployed?"
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleProveDeployment}
          disabled={isPending || isConfirming || !isConnected || !deploymentUrl || !transactionHash}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Proving...' : 'Prove Deployment'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Deployment proof recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}





