'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Multi-Signature Approval
 * Require multiple signatures for important achievements
 */
export default function OnchainAchievementMultiSig() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [signers, setSigners] = useState<string[]>([''])
  const [threshold, setThreshold] = useState('2')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const addSigner = () => {
    setSigners([...signers, ''])
  }

  const updateSigner = (index: number, value: string) => {
    const newSigners = [...signers]
    newSigners[index] = value
    setSigners(newSigners)
  }

  const handleSetupMultiSig = async () => {
    if (!isConnected || !address) return
    
    const validSigners = signers.filter(s => s.startsWith('0x') && s.length === 42)
    if (validSigners.length < parseInt(threshold)) {
      alert('Not enough valid signers for threshold')
      return
    }

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'setupMultiSig',
        args: [BigInt(postId), validSigners, BigInt(threshold)],
      })
    } catch (error) {
      console.error('Error setting up multi-sig:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🔐 Multi-Signature</h3>
        <p className="text-gray-600">Connect wallet to setup multi-sig</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🔐 Onchain Achievement Multi-Signature</h3>
      <p className="text-gray-600 mb-4">
        Require multiple signatures for important achievements onchain
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
          <label className="block text-sm font-medium mb-2">Threshold</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            min="2"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Signers</label>
          {signers.map((signer, index) => (
            <input
              key={index}
              type="text"
              value={signer}
              onChange={(e) => updateSigner(index, e.target.value)}
              placeholder="0x..."
              className="w-full p-2 border rounded-lg mb-2"
            />
          ))}
          <button
            onClick={addSigner}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add Signer
          </button>
        </div>

        <button
          onClick={handleSetupMultiSig}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Setting up...' : '🔐 Setup Multi-Sig'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Multi-signature setup complete
          </div>
        )}
      </div>
    </div>
  )
}
