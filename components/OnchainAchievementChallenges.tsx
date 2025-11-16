'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementChallenges() {
  const { address } = useAccount()
  const [challengeName, setChallengeName] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createChallenge = async () => {
    if (!address || !challengeName) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`CHALLENGE: ${challengeName}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Achievement Challenges</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Challenge name"
          value={challengeName}
          onChange={(e) => setChallengeName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createChallenge}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Challenge'}
        </button>
        {isSuccess && <p className="text-green-600">Challenge created onchain!</p>}
      </div>
    </div>
  )
}
