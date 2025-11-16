'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

export default function OnchainAchievementAchievementRecurring() {
  const { address } = useAccount()
  const [frequency, setFrequency] = useState('weekly')
  
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const setupRecurring = async () => {
    if (!address) return
    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'createPost',
      args: [`RECURRING: ${frequency}`],
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🔄 Recurring Achievements</h2>
      <div className="space-y-4">
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button
          onClick={setupRecurring}
          disabled={isPending || isConfirming}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {isPending || isConfirming ? 'Setting up...' : 'Setup Recurring'}
        </button>
        {isSuccess && <p className="text-green-600">Recurring setup onchain!</p>}
      </div>
    </div>
  )
}

