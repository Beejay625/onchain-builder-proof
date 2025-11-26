'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Proof of Work
 * Require proof of work for achievements to prevent spam
 */
export default function OnchainAchievementProofOfWork() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [nonce, setNonce] = useState('')
  const [difficulty, setDifficulty] = useState('3')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleSubmitProof = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'submitProofOfWork',
        args: [BigInt(postId), nonce, BigInt(difficulty)],
      })
    } catch (error) {
      console.error('Error submitting proof:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">⛏️ Proof of Work</h3>
        <p className="text-gray-600">Connect wallet to submit proof</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">⛏️ Proof of Work</h3>
      <p className="text-gray-600 mb-4">
        Require proof of work for achievements to prevent spam
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
          <label className="block text-sm font-medium mb-2">Nonce</label>
          <input
            type="text"
            value={nonce}
            onChange={(e) => setNonce(e.target.value)}
            placeholder="Enter proof nonce"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Difficulty</label>
          <input
            type="number"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            min="1"
            max="10"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSubmitProof}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Submitting...' : '⛏️ Submit Proof of Work'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Proof of work verified
          </div>
        )}
      </div>
    </div>
  )
}




