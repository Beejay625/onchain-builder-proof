'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAutomatedMilestones() {
  const { address } = useAccount()
  const [milestone, setMilestone] = useState('')
  const [trigger, setTrigger] = useState('')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const setupMilestone = async () => {
    if (!address || !milestone || !trigger) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`AUTO_MILESTONE:${milestone}:${trigger}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Automated Milestones</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Milestone name"
          value={milestone}
          onChange={(e) => setMilestone(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Auto-trigger condition"
          value={trigger}
          onChange={(e) => setTrigger(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          onClick={setupMilestone}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Auto Milestone'}
        </button>
        {isSuccess && <p className="text-green-600">Automated milestone configured!</p>}
      </div>
    </div>
  )
}

