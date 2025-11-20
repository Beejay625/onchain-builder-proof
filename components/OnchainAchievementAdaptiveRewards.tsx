'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAdaptiveRewards() {
  const { address } = useAccount()
  const [postId, setPostId] = useState('')
  const [rewardCurve, setRewardCurve] = useState('linear')
  const [multiplier, setMultiplier] = useState('1')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const configureAdaptiveReward = () => {
    if (!address || !postId) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`ADAPTIVE_REWARD:${postId}:${rewardCurve}:${multiplier}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎚️ Adaptive Rewards</h2>
      <p className="text-gray-600 mb-4">
        Configure adaptive reward curves based on milestone performance.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          className="w-full border rounded-lg p-2"
          placeholder="Achievement ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        <select
          className="w-full border rounded-lg p-2"
          value={rewardCurve}
          onChange={(e) => setRewardCurve(e.target.value)}
        >
          <option value="linear">Linear</option>
          <option value="quadratic">Quadratic</option>
          <option value="exponential">Exponential</option>
        </select>
        <input
          type="number"
          min="0"
          className="w-full border rounded-lg p-2"
          placeholder="Reward multiplier"
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
        />
        <button
          onClick={configureAdaptiveReward}
          disabled={isPending || isConfirming}
          className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Configuring...' : 'Configure Adaptive Reward'}
        </button>
        {isSuccess && (
          <p className="text-green-600">Adaptive reward settings saved onchain.</p>
        )}
      </div>
    </div>
  )
}
