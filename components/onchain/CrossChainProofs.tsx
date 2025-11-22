'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function CrossChainProofs() {
  const { address, isConnected } = useAccount()
  const [sourceChain, setSourceChain] = useState('base')
  const [targetChain, setTargetChain] = useState('mainnet')
  const [proofDescription, setProofDescription] = useState('')
  const [bridgeTxHash, setBridgeTxHash] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  if (!isFeatureEnabled('onchainCrossChainProofs')) {
    return null
  }

  const handleCreateProof = async () => {
    if (!isConnected || !address || !proofDescription.trim()) return

    try {
      const content = `Cross-Chain Proof\nSource: ${sourceChain}\nTarget: ${targetChain}\nDescription: ${proofDescription}${bridgeTxHash ? `\nBridge Tx: ${bridgeTxHash}` : ''}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createPost',
        args: [content],
      })
    } catch (error) {
      console.error('Cross-chain proof failed:', error)
    }
  }

  return (
    <AppCard title="🌉 Cross-Chain Proofs" subtitle="Create proofs that span multiple chains" accent="cyan">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source Chain</label>
            <select
              value={sourceChain}
              onChange={(e) => setSourceChain(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="base">Base</option>
              <option value="mainnet">Ethereum</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="optimism">Optimism</option>
              <option value="polygon">Polygon</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Chain</label>
            <select
              value={targetChain}
              onChange={(e) => setTargetChain(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="mainnet">Ethereum</option>
              <option value="base">Base</option>
              <option value="arbitrum">Arbitrum</option>
              <option value="optimism">Optimism</option>
              <option value="polygon">Polygon</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Proof Description</label>
          <textarea
            value={proofDescription}
            onChange={(e) => setProofDescription(e.target.value)}
            placeholder="Describe the cross-chain proof..."
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bridge Transaction Hash (optional)</label>
          <input
            type="text"
            value={bridgeTxHash}
            onChange={(e) => setBridgeTxHash(e.target.value)}
            placeholder="0x..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <button
          onClick={handleCreateProof}
          disabled={isPending || isConfirming || !isConnected || !proofDescription.trim()}
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Cross-Chain Proof'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            ✅ Cross-chain proof recorded onchain
          </div>
        )}
      </div>
    </AppCard>
  )
}

