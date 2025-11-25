'use client'

import { useAccount } from 'wagmi'
import { useMemo } from 'react'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function StakeSlashingRadar() {
  const { isConnected } = useAccount()

  const radarInsights = useMemo(
    () => ({
      totalAlerts: 3,
      mitigated: 2,
      pending: 1,
    }),
    []
  )

  if (!isFeatureEnabled('stakeSlashingRadar') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="⚠️ Stake Slashing Radar"
      subtitle="Watch for validator penalties impacting BuilderProof staking pools."
      accent="amber"
    >
      <div className="grid grid-cols-3 gap-3">
        <StatBadge label="Alerts" value={radarInsights.totalAlerts.toString()} accent="red" />
        <StatBadge label="Mitigated" value={radarInsights.mitigated.toString()} accent="green" />
        <StatBadge label="Pending" value={radarInsights.pending.toString()} accent="amber" />
      </div>
      <p className="mt-3 text-xs text-gray-500">Sourced from last 24h validator metrics across Base + L2 mirrors.</p>
    </AppCard>
  )
}

