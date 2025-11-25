'use client'

import { useAccount } from 'wagmi'
import { useMemo, useState } from 'react'

import AppCard from '@/components/common/AppCard'
import StatBadge from '@/components/common/StatBadge'
import { isFeatureEnabled } from '@/lib/featureFlags'

export default function ToolchainFingerprints() {
  const { isConnected } = useAccount()
  const [toolchain, setToolchain] = useState('foundry@1.0.0')

  const fingerprint = useMemo(() => `${toolchain}:${toolchain.length.toString(16)}`, [toolchain])

  if (!isFeatureEnabled('toolchainFingerprints') || !isConnected) {
    return null
  }

  return (
    <AppCard
      title="🧪 Toolchain Fingerprints"
      subtitle="Capture cryptographic fingerprints for critical toolchains."
      accent="cyan"
    >
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Toolchain</label>
          <input
            type="text"
            value={toolchain}
            onChange={(e) => setToolchain(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-sm font-mono"
          />
        </div>
        <StatBadge label="Fingerprint" value={fingerprint} accent="cyan" />
        <p className="text-xs text-gray-500">Use these fingerprints to compare CI/CD outputs vs. local builds.</p>
      </div>
    </AppCard>
  )
}

