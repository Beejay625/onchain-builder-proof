'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Cross-Chain Attestation
 * Attest achievements across multiple chains
 */
export default function OnchainAchievementCrossChainAttestation() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [targetChain, setTargetChain] = useState('arbitrum')
  const [targetContract, setTargetContract] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const chains = [
    { id: 'arbitrum', name: 'Arbitrum' },
    { id: 'optimism', name: 'Optimism' },
    { id: 'polygon', name: 'Polygon' },
    { id: 'ethereum', name: 'Ethereum Mainnet' },
  ]

  const handleAttest = async () => {
    if (!isConnected || !address) return
    
    if (!targetContract.startsWith('0x') || targetContract.length !== 42) {
      alert('Invalid target contract address')
      return
    }

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createCrossChainAttestation',
        args: [BigInt(postId), targetChain, targetContract as `0x${string}`],
      })
    } catch (error) {
      console.error('Error creating attestation:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🌉 Cross-Chain Attestation</h3>
        <p className="text-gray-600">Connect wallet to create attestations</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🌉 Cross-Chain Attestation</h3>
      <p className="text-gray-600 mb-4">
        Attest achievements across multiple chains onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Achievement ID</label>
          <input
            type="text"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Enter achievement ID"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Target Chain</label>
          <select
            value={targetChain}
            onChange={(e) => setTargetChain(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {chains.map(chain => (
              <option key={chain.id} value={chain.id}>{chain.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Target Contract</label>
          <input
            type="text"
            value={targetContract}
            onChange={(e) => setTargetContract(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleAttest}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Attesting...' : '🌉 Create Attestation'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Cross-chain attestation created
          </div>
        )}
      </div>
    </div>
  )
}




