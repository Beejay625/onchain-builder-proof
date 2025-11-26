'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Metadata IPFS Storage
 * Store achievement metadata on IPFS and reference onchain
 */
export default function OnchainAchievementIPFSStorage() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [ipfsHash, setIpfsHash] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleStoreIPFS = async () => {
    if (!isConnected || !address) return
    
    if (!ipfsHash.startsWith('Qm') && !ipfsHash.startsWith('baf')) {
      alert('Invalid IPFS hash format')
      return
    }

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'setIPFSMetadata',
        args: [BigInt(postId), ipfsHash],
      })
    } catch (error) {
      console.error('Error storing IPFS hash:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">📦 IPFS Storage</h3>
        <p className="text-gray-600">Connect wallet to store metadata</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">📦 IPFS Metadata Storage</h3>
      <p className="text-gray-600 mb-4">
        Store achievement metadata on IPFS and reference onchain
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
          <label className="block text-sm font-medium mb-2">IPFS Hash</label>
          <input
            type="text"
            value={ipfsHash}
            onChange={(e) => setIpfsHash(e.target.value)}
            placeholder="Qm... or baf..."
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleStoreIPFS}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Storing...' : '📦 Store IPFS Metadata'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ IPFS metadata stored onchain
          </div>
        )}
      </div>
    </div>
  )
}




