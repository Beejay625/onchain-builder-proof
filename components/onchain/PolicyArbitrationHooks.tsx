'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function PolicyArbitrationHooks() {
  const { isConnected } = useAccount()
  const [policies, setPolicies] = useState(['rewardVaults', 'mentorshipIntake'])

  if (!isFeatureEnabled('policyArbitrationHooks') || !isConnected) {
    return null
  }

  const togglePolicy = (policy: string) => {
    setPolicies((prev) =>
      prev.includes(policy) ? prev.filter((p) => p !== policy) : [...prev, policy]
    )
  }

  const availablePolicies = ['rewardVaults', 'mentorshipIntake', 'airdrops', 'royalties']

  return (
    <AppCard
      title="⚖️ Policy Arbitration Hooks"
      subtitle="Define which policies must pass arbitration before execution."
      accent="yellow"
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {availablePolicies.map((policy) => (
            <button
              key={policy}
              type="button"
              onClick={() => togglePolicy(policy)}
              className={`rounded-lg border px-3 py-2 text-sm capitalize ${
                policies.includes(policy) ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-gray-200'
              }`}
            >
              {policy}
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-900">
          {policies.length} hooks require arbitration votes.
        </div>
        <p className="text-xs text-gray-500">
          Arbitration hooks create mandatory checkpoints before high-risk automations mutate treasury state.
        </p>
      </div>
    </AppCard>
  )
}

