'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementSuccessRateProps {
  achievementId: bigint
}

export default function OnchainAchievementSuccessRate({ achievementId }: OnchainAchievementSuccessRateProps) {
  const { address } = useAccount()
  const [successRate, setSuccessRate] = useState('')
  const [totalAttempts, setTotalAttempts] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateSuccessRate = async () => {
    if (!address || !successRate.trim()) return
    
    const successData = `SUCCESS_RATE:${successRate.trim()}:attempts:${totalAttempts.trim() || '0'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, successData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Achievement Success Rate</h3>
      
      <input
        type="number"
        step="0.01"
        value={successRate}
        onChange={(e) => setSuccessRate(e.target.value)}
        placeholder="Success rate (0-100)"
        min="0"
        max="100"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="number"
        value={totalAttempts}
        onChange={(e) => setTotalAttempts(e.target.value)}
        placeholder="Total attempts (optional)"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={updateSuccessRate}
        disabled={isPending || isConfirming || !successRate.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Success Rate Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Success rate updated onchain
        </div>
      )}
    </div>
  )
}
