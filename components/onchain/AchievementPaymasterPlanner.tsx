'use client'

import { useAccount } from 'wagmi'
import AppCard from '@/components/common/AppCard'
import { useState } from 'react'
import { isFeatureEnabled } from '@/lib/featureFlags'
import StatBadge from '@/components/common/StatBadge'

export default function AchievementPaymasterPlanner() {
  const { isConnected } = useAccount()
  const [budget, setBudget] = useState('0.5')
  const [spent, setSpent] = useState(0)

  if (!isFeatureEnabled('achievementPaymasterPlanner')) {
    return null
  }

  const handleAllocate = () => {
    if (!isConnected || !budget.trim()) return
    setSpent((prev) => prev + Number(budget))
  }

  return (
    <AppCard title="💳 Paymaster Budget Planner" subtitle="Allocate gas sponsorship budgets per account abstraction flow" accent="teal">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allocation (ETH)</label>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <button
          onClick={handleAllocate}
          disabled={!isConnected || !budget.trim()}
          className="w-full rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:bg-gray-400"
        >
          Allocate Budget
        </button>
        <div className="grid grid-cols-2 gap-4">
          <StatBadge label="Latest Allocation" value={`${budget} ETH`} accent="teal" />
          <StatBadge label="Total Sponsored" value={`${spent.toFixed(3)} ETH`} accent="green" />
        </div>
      </div>
    </AppCard>
  )
}

