'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementChallengeSystem() {
  const { address } = useAccount()
  const [challengeName, setChallengeName] = useState('')
  const [reward, setReward] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const createChallenge = async () => {
    if (!address || !challengeName || !reward) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [BigInt(0), `CHALLENGE: ${challengeName} - ${reward} ETH reward`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Challenge System</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Challenge name"
          value={challengeName}
          onChange={(e) => setChallengeName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Reward (ETH)"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={createChallenge}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Creating...' : 'Create Challenge'}
        </button>
        {isSuccess && <p className="text-green-600">Challenge created onchain!</p>}
      </div>
    </div>
  )
}

