'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementChallengesProps {
  achievementId: bigint
}

export default function OnchainAchievementChallenges({ achievementId }: OnchainAchievementChallengesProps) {
  const { address } = useAccount()
  const [challengeName, setChallengeName] = useState('')
  const [challengeDescription, setChallengeDescription] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createChallenge = async () => {
    if (!address || !challengeName.trim()) return
    
    const challengeData = `ACHIEVEMENT_CHALLENGE: ${challengeName} - ${challengeDescription || 'No description'}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, challengeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">🎯 Onchain Achievement Challenges</h3>
      
      <input
        type="text"
        value={challengeName}
        onChange={(e) => setChallengeName(e.target.value)}
        placeholder="Challenge name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <textarea
        value={challengeDescription}
        onChange={(e) => setChallengeDescription(e.target.value)}
        placeholder="Challenge description..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={3}
      />
      
      <button
        onClick={createChallenge}
        disabled={isPending || isConfirming || !challengeName.trim()}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Challenge'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Challenge created onchain
        </div>
      )}
    </div>
  )
}
