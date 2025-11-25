'use client'

import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function AntiSybilDossier() {
  const { isConnected } = useAccount()
  const [walletsReviewed, setWalletsReviewed] = useState(42)

  const dossier = useMemo(
    () => ({
      riskScore: (walletsReviewed % 10) + 70,
      flagged: Math.floor(walletsReviewed / 7),
    }),
    [walletsReviewed]
  )

  if (!isFeatureEnabled('antiSybilDossier') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🧬 Anti-Sybil Dossier"
      subtitle="Track high-risk entities interacting with BuilderProof achievements."
      accent="fuchsia"
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Wallets Reviewed</label>
          <input
            type="number"
            value={walletsReviewed}
            onChange={(e) => setWalletsReviewed(Number(e.target.value) || 0)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <StatBadge label="Risk Score" value={dossier.riskScore.toString()} accent="fuchsia" />
          <StatBadge label="Flagged Wallets" value={dossier.flagged.toString()} accent="red" />
        </div>
        <p className="text-xs text-gray-500">
          Combines heuristics + attestation graph signals to preempt Sybil reward drains.
        </p>
      </div>
    </AppCard>
  )
}

