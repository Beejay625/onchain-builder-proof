'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BuilderProofABI } from '@/abi/BuilderProof'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0xD96Da91A4DC052C860F4cA452efF924bd88CC437'

export default function DeploymentProof() {
  const [deploymentURL, setDeploymentURL] = useState('')
  const [txHash, setTxHash] = useState('')
  const [network, setNetwork] = useState('base')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const proveDeployment = async () => {
    if (!deploymentURL.trim() || !txHash.trim()) return

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'proveDeployment',
        args: [deploymentURL, txHash, network],
      })
    } catch (error) {
      console.error('Deployment proof error:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🚀 Deployment Proof</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">Deployment URL</label>
          <input
            type="url"
            value={deploymentURL}
            onChange={(e) => setDeploymentURL(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Transaction Hash</label>
          <input
            type="text"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Network</label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="base">Base</option>
            <option value="ethereum">Ethereum</option>
            <option value="arbitrum">Arbitrum</option>
          </select>
        </div>
        <button
          onClick={proveDeployment}
          disabled={isPending}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending ? 'Recording...' : 'Record Deployment'}
        </button>
        {isSuccess && (
          <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
            ✓ Deployment recorded onchain
          </div>
        )}
      </div>
    </div>
  )
}
