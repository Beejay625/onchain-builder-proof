'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import { isFeatureEnabled } from '@/lib/featureFlags'

function formatPreview(before: string, after: string) {
  return `- ${before}\n+ ${after}`
}

export default function StateDiffSnapshots() {
  const { isConnected } = useAccount()
  const [beforeState, setBeforeState] = useState('supply: 1,000,000')
  const [afterState, setAfterState] = useState('supply: 1,025,000')

  if (!isFeatureEnabled('stateDiffSnapshots') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🪞 State Diff Snapshots"
      subtitle="Prep diffs before running onchain migrations."
      accent="blue"
    >
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Before</label>
          <textarea
            value={beforeState}
            onChange={(e) => setBeforeState(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">After</label>
          <textarea
            value={afterState}
            onChange={(e) => setAfterState(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <pre className="whitespace-pre-wrap rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-900">
          {formatPreview(beforeState, afterState)}
        </pre>
        <p className="text-xs text-gray-500">
          Snapshots are propagated to auditors so they can compare pre/post state at a glance.
        </p>
      </div>
    </AppCard>
  )
}

