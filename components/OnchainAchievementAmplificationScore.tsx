'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAmplificationScoreProps {
  achievementId: bigint
}

export default function OnchainAchievementAmplificationScore({ achievementId }: OnchainAchievementAmplificationScoreProps) {
  const { address } = useAccount()
  const [amplificationScore, setAmplificationScore] = useState('')
  const [amplificationFactors, setAmplificationFactors] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateAmplificationScore = async () => {
    if (!address || !amplificationScore.trim()) return
    
    const amplificationData = `AMPLIFICATION:score:${amplificationScore.trim()}:factors:${amplificationFactors.trim() || 'none'}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, amplificationData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📢 Amplification Score</h3>
      
      <input
        type="number"
        step="0.01"
        value={amplificationScore}
        onChange={(e) => setAmplificationScore(e.target.value)}
        placeholder="Amplification score"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={amplificationFactors}
        onChange={(e) => setAmplificationFactors(e.target.value)}
        placeholder="Amplification factors (comma-separated)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={updateAmplificationScore}
        disabled={isPending || isConfirming || !amplificationScore.trim()}
        className="w-full px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Amplification Score Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Amplification score updated onchain
        </div>
      )}
    </div>
  )
}
