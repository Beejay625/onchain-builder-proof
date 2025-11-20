'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementCrossChainProofsProps {
  achievementId: bigint
}

export default function OnchainAchievementCrossChainProofs({ achievementId }: OnchainAchievementCrossChainProofsProps) {
  const { address } = useAccount()
  const [sourceChain, setSourceChain] = useState('base')
  const [targetChain, setTargetChain] = useState('arbitrum')
  const [proofHash, setProofHash] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createCrossChainProof = async () => {
    if (!address || !proofHash.trim()) return
    
    const proofData = `CROSS_CHAIN_PROOF: ${sourceChain} -> ${targetChain} | hash: ${proofHash}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, proofData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🌉 Cross-Chain Proofs</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <select
          value={sourceChain}
          onChange={(e) => setSourceChain(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="base">Base</option>
          <option value="arbitrum">Arbitrum</option>
          <option value="optimism">Optimism</option>
        </select>
        
        <select
          value={targetChain}
          onChange={(e) => setTargetChain(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="arbitrum">Arbitrum</option>
          <option value="optimism">Optimism</option>
          <option value="polygon">Polygon</option>
        </select>
      </div>
      
      <input
        type="text"
        value={proofHash}
        onChange={(e) => setProofHash(e.target.value)}
        placeholder="Proof hash"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 font-mono text-sm"
      />
      
      <button
        onClick={createCrossChainProof}
        disabled={isPending || isConfirming || !proofHash.trim()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Cross-Chain Proof Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Cross-chain proof created onchain
        </div>
      )}
    </div>
  )
}
