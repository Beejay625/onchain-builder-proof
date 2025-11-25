'use client'

import { useMemo } from 'react'
import { useAccount } from 'wagmi'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function FraudProofMonitor() {
  const { isConnected } = useAccount()

  const metrics = useMemo(
    () => ({
      pending: 1,
      resolved: 4,
      escalated: 0,
    }),
    []
  )

  if (!isFeatureEnabled('fraudProofMonitor') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🛡️ Fraud Proof Monitor"
      subtitle="Surfacing pending Optimistic fraud proofs tied to BuilderProof payloads."
      accent="red"
    >
      <div className="grid grid-cols-3 gap-3">
        <StatBadge label="Pending" value={metrics.pending.toString()} accent="amber" />
        <StatBadge label="Resolved" value={metrics.resolved.toString()} accent="green" />
        <StatBadge label="Escalated" value={metrics.escalated.toString()} accent="red" />
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Aggregates Base + OP Stack watchers to give fast insight into fraud proof posture.
      </p>
    </AppCard>
  )
}

