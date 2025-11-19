'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { BuilderProofABI } from '@/abi/BuilderProof'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'

/**
 * Onchain Achievement Loans
 * Borrow against achievements as collateral
 */
export default function OnchainAchievementLoans() {
  const { address, isConnected } = useAccount()
  const [postId, setPostId] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [duration, setDuration] = useState('30')

  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const handleCreateLoan = async () => {
    if (!isConnected || !address) return

    try {
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'createAchievementLoan',
        args: [BigInt(postId), BigInt(loanAmount), BigInt(duration)],
      })
    } catch (error) {
      console.error('Error creating loan:', error)
    }
  }

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">💳 Achievement Loans</h3>
        <p className="text-gray-600">Connect wallet to borrow</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">💳 Achievement Loans</h3>
      <p className="text-gray-600 mb-4">
        Borrow against achievements as collateral onchain
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Achievement ID (Collateral)</label>
          <input
            type="text"
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Enter achievement ID"
            className="w-full p-2 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Loan Amount (ETH)</label>
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="0.1"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Duration (days)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleCreateLoan}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Creating...' : '💳 Create Loan'}
        </button>

        {isConfirmed && (
          <div className="p-3 bg-green-100 text-green-800 rounded-lg">
            ✅ Loan created successfully
          </div>
        )}
      </div>
    </div>
  )
}

