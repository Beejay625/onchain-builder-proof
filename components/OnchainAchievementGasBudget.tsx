'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'

interface OnchainAchievementGasBudgetProps {
  achievementId: bigint
}

export default function OnchainAchievementGasBudget({ achievementId }: OnchainAchievementGasBudgetProps) {
  const { address } = useAccount()
  const [chain, setChain] = useState('Base')
  const [budget, setBudget] = useState('0.45')
  const [purpose, setPurpose] = useState('deployment')

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const logBudget = () => {
    if (!address || !budget.trim()) return

    const payload = `GAS_BUDGET|chain:${chain}|budget:${budget}|purpose:${purpose}`

    writeContract({
      address: BUILDER_PROOF_CONTRACT as `0x${string}`,
      abi: BuilderProofABI,
      functionName: 'addComment',
      args: [achievementId, payload],
    })
  }

  return (
    <div className="bg-white border border-lime-100 rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">⛽️ Gas Budget Planner</h3>
      <p className="text-sm text-gray-600 mb-4">Keep teams honest about gas allocation for each deliverable.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <input value={chain} onChange={(e) => setChain(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Chain" />
        <input value={budget} onChange={(e) => setBudget(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Budget (ETH)" />
        <input value={purpose} onChange={(e) => setPurpose(e.target.value)} className="border border-gray-300 rounded-lg p-2" placeholder="Purpose" />
      </div>

      <button
        onClick={logBudget}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 bg-lime-600 text-white rounded-lg font-semibold hover:bg-lime-700 disabled:bg-gray-400"
      >
        {isPending || isConfirming ? 'Logging budget...' : 'Log gas budget'}
      </button>

      {isSuccess && (
        <div className="mt-4 text-sm text-lime-700 bg-lime-50 border border-lime-200 rounded-lg p-3">
          ✓ Gas budget stored with the achievement timeline.
        </div>
      )}
    </div>
  )
}
