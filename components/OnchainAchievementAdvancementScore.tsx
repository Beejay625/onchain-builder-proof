'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAdvancementScoreProps {
  achievementId: bigint
}

export default function OnchainAchievementAdvancementScore({ achievementId }: OnchainAchievementAdvancementScoreProps) {
  const { address } = useAccount()
  const [advancementScore, setAdvancementScore] = useState('')
  const [advancementLevel, setAdvancementLevel] = useState('intermediate')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const updateAdvancementScore = async () => {
    if (!address || !advancementScore.trim()) return
    
    const advancementData = `ADVANCEMENT:score:${advancementScore.trim()}:level:${advancementLevel}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, advancementData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">📈 Advancement Score</h3>
      
      <input
        type="number"
        step="0.01"
        value={advancementScore}
        onChange={(e) => setAdvancementScore(e.target.value)}
        placeholder="Advancement score"
        min="0"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <select
        value={advancementLevel}
        onChange={(e) => setAdvancementLevel(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="expert">Expert</option>
        <option value="master">Master</option>
      </select>
      
      <button
        onClick={updateAdvancementScore}
        disabled={isPending || isConfirming || !advancementScore.trim()}
        className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Updating...' : 'Update Advancement Score Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Advancement score updated onchain
        </div>
      )}
    </div>
  )
}
