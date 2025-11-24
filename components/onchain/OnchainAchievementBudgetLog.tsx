'use client'

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { BUILDER_PROOF_CONTRACT } from '@/lib/constants'
import { BuilderProofABI } from '@/abi/BuilderProof'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'

interface OnchainAchievementBudgetLogProps {
  achievementId: bigint
}

export default function OnchainAchievementBudgetLog({ achievementId }: OnchainAchievementBudgetLogProps) {
  const { address, isConnected } = useAccount()
  const [budgetCategory, setBudgetCategory] = useState('')
  const [budgetAmount, setBudgetAmount] = useState('')
  const [budgetNote, setBudgetNote] = useState('')
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async () => {
    if (!isConnected || !address || !budgetCategory.trim() || !budgetAmount.trim()) return

    try {
      const payload = `BUDGET_LOG:category:${budgetCategory}:amount:${budgetAmount}:note:${budgetNote || 'n/a'}:${Date.now()}`
      writeContract({
        address: BUILDER_PROOF_CONTRACT as `0x${string}`,
        abi: BuilderProofABI,
        functionName: 'addComment',
        args: [achievementId, payload],
      })
    } catch (error) {
      console.error('🧾 Budget Log submission failed:', error)
    }
  }

  return (
    <AppCard title="🧾 Budget Log" subtitle="Log spend or budget allocations" accent="orange">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <input
            type="text"
            value={budgetCategory}
            onChange={(e) => setBudgetCategory(e.target.value)}
            placeholder="Infra, grants"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
          <input
            type="text"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            placeholder="2500 USDC"
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={budgetNote}
            onChange={(e) => setBudgetNote(e.target.value)}
            placeholder="Why was this spent?"
            rows={3}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending || isConfirming || !isConnected || !budgetCategory.trim() || !budgetAmount.trim()}
          className="w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:bg-gray-400"
        >
          {isPending || isConfirming ? 'Recording Budget Entry' : 'Record Budget Entry'}
        </button>
        {isConfirmed && (
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            ✅ Budget entry saved
          </div>
        )}
      </div>
    </AppCard>
  )
}
