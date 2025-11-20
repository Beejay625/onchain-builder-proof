'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementCrossDAORewards() {
  const { address } = useAccount()
  const [daoName, setDaoName] = useState('')
  const [reward, setReward] = useState('')
  const [achievement, setAchievement] = useState('')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const allocateReward = () => {
    if (!address || !daoName || !reward || !achievement) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`CROSS_DAO:${daoName}:${achievement}:${reward}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🌐 Cross-DAO Rewards</h2>
      <p className="text-gray-600 mb-4">
        Route recognition to builders contributing across multiple DAOs.
      </p>
      <div className="space-y-4">
        <input
          className="w-full border rounded-lg p-2"
          placeholder="DAO name"
          value={daoName}
          onChange={(e) => setDaoName(e.target.value)}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Achievement reference"
          value={achievement}
          onChange={(e) => setAchievement(e.target.value)}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Reward descriptor (e.g. 50 XP)"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
        <button
          onClick={allocateReward}
          disabled={isPending || isConfirming}
          className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Allocating...' : 'Allocate Cross-DAO Reward'}
        </button>
        {isSuccess && (
          <p className="text-green-600">Cross-DAO reward recorded successfully.</p>
        )}
      </div>
    </div>
  )
}
