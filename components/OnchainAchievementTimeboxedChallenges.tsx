'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementTimeboxedChallengesProps {
  achievementId: bigint
}

export default function OnchainAchievementTimeboxedChallenges({ achievementId }: OnchainAchievementTimeboxedChallengesProps) {
  const { address } = useAccount()
  const [challengeName, setChallengeName] = useState('')
  const [challengeDuration, setChallengeDuration] = useState('')
  const [challengeDeadline, setChallengeDeadline] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  const createTimeboxedChallenge = async () => {
    if (!address || !challengeName.trim() || !challengeDuration.trim()) return
    
    const deadlineTimestamp = challengeDeadline ? Math.floor(new Date(challengeDeadline).getTime() / 1000) : 'none'
    const challengeData = `TIMEBOXED_CHALLENGE:name:${challengeName.trim()}:duration:${challengeDuration.trim()}:deadline:${deadlineTimestamp}:timestamp:${Math.floor(Date.now() / 1000)}`
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, challengeData],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">⏱️ Timeboxed Challenges</h3>
      
      <input
        type="text"
        value={challengeName}
        onChange={(e) => setChallengeName(e.target.value)}
        placeholder="Challenge name"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="text"
        value={challengeDuration}
        onChange={(e) => setChallengeDuration(e.target.value)}
        placeholder="Duration (e.g., 7 days, 2 weeks)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <input
        type="datetime-local"
        value={challengeDeadline}
        onChange={(e) => setChallengeDeadline(e.target.value)}
        placeholder="Deadline (optional)"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
      />
      
      <button
        onClick={createTimeboxedChallenge}
        disabled={isPending || isConfirming || !challengeName.trim() || !challengeDuration.trim()}
        className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Creating...' : 'Create Timeboxed Challenge Onchain'}
      </button>

      {isSuccess && (
        <div className="mt-4 p-3 bg-green-50 border border-green-500 rounded-lg text-sm text-green-700">
          ✓ Timeboxed challenge created onchain
        </div>
      )}
    </div>
  )
}
