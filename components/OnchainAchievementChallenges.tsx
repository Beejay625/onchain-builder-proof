'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT, BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementChallenges() {
  const { address } = useAccount()
  const [challenge, setChallenge] = useState('')
  const [deadline, setDeadline] = useState('')
  
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createChallenge = async () => {
    if (!address || !challenge) return
    
    writeContract({
      address: BUILDER_PROOF_CONTRACT,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`Challenge: ${challenge} - Deadline: ${deadline}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Create Challenge</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Challenge description"
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg h-24"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createChallenge}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Challenge'}
        </button>
        {isSuccess && <p className="text-green-600">Challenge created onchain!</p>}
      </div>
    </div>
  )
}

