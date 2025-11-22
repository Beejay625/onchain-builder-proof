'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementAutomatedRewardsProps {
  achievementId: bigint
}

export default function OnchainAchievementAutomatedRewards({ achievementId }: OnchainAchievementAutomatedRewardsProps) {
  const { address } = useAccount()
  const [trigger, setTrigger] = useState('milestone completion')
  const [rewardAmount, setRewardAmount] = useState('1000')
  const [autoDistribute, setAutoDistribute] = useState('yes')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const publishAutomation = () => {
    if (!address || !trigger.trim()) return

    const payload = `AUTO_REWARD|trigger:${trigger}|amount:${rewardAmount}|auto:${autoDistribute}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <section className="bg-white border border-green-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">🤖 Automated Rewards</h3>
      <p className="text-sm text-gray-600 mb-4">Define trigger-based reward distributions tied to achievement events.</p>

      <div className="space-y-3 mb-4">
        <input value={trigger} onChange={(e) => setTrigger(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Trigger condition" />
        <input value={rewardAmount} onChange={(e) => setRewardAmount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Reward amount" />
        <input value={autoDistribute} onChange={(e) => setAutoDistribute(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Auto distribute" />
      </div>

      <button
        onClick={publishAutomation}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Publishing automation...' : 'Publish automated reward'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          ✓ Automated reward policy stored.
        </div>
      )}
    </section>
  )
}
