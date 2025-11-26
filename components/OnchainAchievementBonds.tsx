'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Bonds
 * Issue bonds backed by achievements
 */
export default function OnchainAchievementBonds() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [bondAmount, setBondAmount] = useState('')
  const [interestRate, setInterestRate] = useState('5')
  const [maturity, setMaturity] = useState('365')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleIssueBond = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'issueAchievementBond',
        args: [BigInt(postId), BigInt(bondAmount), BigInt(interestRate), BigInt(maturity)],
      })
    } catch (error) {
      console.error('Error issuing bond:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🏦 Achievement Bonds</h3>
        <p className="text-gray-600">Connect wallet to issue bonds</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">🏦 Achievement Bonds</h3>
      <p className="text-gray-600 mb-4">
        Issue bonds backed by achievements onchain
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
          <label className="block text-sm font-medium mb-2">Bond Amount (ETH)</label>
          <input
            type="text"
            value={bondAmount}
            onChange={(e) => setBondAmount(e.target.value)}
            placeholder="1.0"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            min="0"
            max="100"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Maturity (days)</label>
          <input
            type="number"
            value={maturity}
            onChange={(e) => setMaturity(e.target.value)}
            min="1"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleIssueBond}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Issuing...' : '🏦 Issue Bond'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Bond issued successfully
          </div>
        )}
      </div>
    </div>
  )
}




